#!/bin/sh

PUBLIC_PATH=/usr/share/nginx/html

for file in $(find $PUBLIC_PATH -type f -name "*.js");
do
  echo "Processing $file ...";

  sed -i "s|{{WEB_SHELL_INTERNAL_KEY}}|$WEB_SHELL_INTERNAL_KEY|g" $file
  sed -i "s|{{PORTFOLIO_MICRO_FRONT_URL}}|$PORTFOLIO_MICRO_FRONT_URL|g" $file
  sed -i "s|{{PORTFOLIO_MICRO_FRONT_EXPOSED_MODULE}}|$PORTFOLIO_MICRO_FRONT_EXPOSED_MODULE|g" $file
  sed -i "s|{{PORTFOLIO_MICRO_FRONT_COMPONENT}}|$PORTFOLIO_MICRO_FRONT_COMPONENT|g" $file
done

echo "Starting Nginx..."
exec "$@"
