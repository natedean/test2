build:
  # Home page build
	jspm bundle-sfx --minify lib/main dist/app.min.js
	./node_modules/.bin/html-dist index.html --remove-all --minify --insert app.min.js -o dist/index.html
	# Remove localhost reference in lieu relative references
	replace 'http://localhost:3000' '' dist/*
