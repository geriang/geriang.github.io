#!/bin/sh
# This script replaces placeholders with actual environment variables

# Replace {{ NETLIFY_EMAIL }} with the actual value from Netlify
sed -i 's/{{ NETLIFY_EMAIL }}/'"$NETLIFY_EMAIL"'/g' index.html

# Replace {{ NETLIFY_PASSWORD }} with the actual value from Netlify
sed -i 's/{{ NETLIFY_PASSWORD }}/'"$NETLIFY_PASSWORD"'/g' index.html
