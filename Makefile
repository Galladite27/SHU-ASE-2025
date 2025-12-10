FILES := README.md documents/backlog.md documents/master-document.odt src/
DATE := `date +%F`

doc:
	git checkout master
	git clean -fxd

	zip -r "release-$(DATE).zip" $(FILES)

.PHONY: doc
