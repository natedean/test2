build:
  # Home page build
	sudo jspm bundle-sfx --minify lib/main -o dist/app.min.js
	sudo ./node_modules/.bin/html-dist index.html --remove-all --minify --insert app.min.js -o dist/index.html
	# Remove localhost reference in lieu relative references
	sudo replace 'http://localhost:3000' '' dist/*
