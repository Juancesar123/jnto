rm -rf dist && npm run build && rsync -avz dist/ jnto:/usr/share/nginx/html
