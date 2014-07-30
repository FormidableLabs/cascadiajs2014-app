define([
  "app/models/note"
], function (NoteModel) {
  describe("app/models/note", function () {

    beforeEach(function () {
      this.model = new NoteModel();
    });
    afterEach(function () {
      this.model = null;
    });

    it("should have expected defaults");
    it("can set the title property");
    it("can set the text property");
  });
});