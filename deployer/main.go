package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"golang.org/x/crypto/ssh"
)

type Config struct {
	Host        string
	User        string
	SSHKey      string
	ComposePath string
	ServiceName string
}

type sshClient struct {
	*ssh.Client
}

func main() {
	log.Println("Starting deployment...")

	config, err := loadConfig()
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
		return
	}

	log.Printf("Connecting to %s@%s...", config.User, config.Host)
	client, err := newSSHClient(config.User, config.Host, config.SSHKey)
	if err != nil {
		log.Fatalf("Error creating SSH client: %v", err)
		return
	}
	defer client.Close()
	log.Println("Connected.")
	deployCmds := []string{
		fmt.Sprintf("cd %s", config.ComposePath),
		"echo 'Downloading new image (pull)...'",
		fmt.Sprintf("docker-compose pull %s", config.ServiceName),
		"echo 'Restarting the service (up)...'",
		fmt.Sprintf("docker-compose up -d --no-deps %s", config.ServiceName),
		"echo 'Deployment completed successfully.'",
	}

	for _, cmd := range deployCmds {
		log.Printf("--- Running command: %s ---", cmd)
		if err := client.run(cmd); err != nil {
			log.Printf("Error running command '%s': %v", cmd, err)
		}
		log.Printf("--- Command completed ---")
	}
}

func loadConfig() (*Config, error) {
	config := &Config{
		Host:        os.Getenv("HOST"),
		User:        os.Getenv("USER"),
		SSHKey:      os.Getenv("SSH_KEY"),
		ComposePath: os.Getenv("COMPOSE_PATH"),
		ServiceName: os.Getenv("SERVICE_NAME"),
	}

	if config.Host == "" || config.User == "" || config.SSHKey == "" || config.ServiceName == "" {
		return nil, fmt.Errorf("missing required environment variables")
	}
	if config.ComposePath == "" {
		config.ComposePath = "/home/" + config.User + "/frontend-stack"
	}

	return config, nil
}

func newSSHClient(user, host, key string) (*sshClient, error) {
	signer, err := ssh.ParsePrivateKey([]byte(key))
	if err != nil {
		return nil, fmt.Errorf("couldn't parse SSH Key: %w", err)
	}

	config := &ssh.ClientConfig{
		User: user,
		Auth: []ssh.AuthMethod{
			ssh.PublicKeys(signer),
		},
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
		Timeout:         10 * time.Second,
	}

	conn, err := ssh.Dial("tcp", host+":22", config)
	if err != nil {
		return nil, fmt.Errorf("couldn't connect to SSH server: %w", err)
	}

	return &sshClient{conn}, nil
}

func (c *sshClient) run(cmd string) error {
	session, err := c.NewSession()
	if err != nil {
		return fmt.Errorf("couldn't create SSH session: %w", err)
	}
	defer session.Close()

	session.Stdout = os.Stdout
	session.Stderr = os.Stderr

	return session.Run(cmd)
}
