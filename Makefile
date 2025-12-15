FILES := README.md documents/backlog.md documents/master-document.odt new_app/
DATE := `date +%F`

doc:
	git checkout master
	git clean -fxd

	zip -r "release-$(DATE).zip" $(FILES)

.PHONY: doc
