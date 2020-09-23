find . -type f -name "*.JPG" -exec sh -c 'mv "$1" "${1%.JPG}.jpg"' _ {} \;
