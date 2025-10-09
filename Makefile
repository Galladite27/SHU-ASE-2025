FILES=README.md documents/backlog.md documents/master-document.odt src/

doc:
	git clean -fxd
	zip -r "release-$(date +%F).zip" $(FILES)

.PHONY: doc
