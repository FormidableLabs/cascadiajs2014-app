// app/js/app/app.js
/**
 * Application.
 *
 * This file is usually the "binding" of all of the individual Backbone.js
 * components into a unified whole. It is also typically *not* unit tested
 * because it has side effects from just running it. So, here is the expected
 * place to also do things like start Backbone.js History, do `$()` DOM
 * manipulation, etc.
 */
define([
  "jquery",
  "underscore",
  "backbone",

  // Import and compile a HBS template.
  "hbs!app/templates/note",
  "hbs!app/templates/notes",

  // Polyfill JSON for old browsers.
  "json2",
  "backbone.localStorage"
], function (
  $,
  _,
  Backbone,
  noteTmpl,
  notesTmpl
) {
  "use strict";

  // --------------------------------------------------------------------------
  // Backbone.js Components.
  // --------------------------------------------------------------------------
  var NoteModel = Backbone.Model.extend({
    defaults: { title: "", text: "*Add Note!*" }
  });
  var NotesCollection = Backbone.Collection.extend({
    model: NoteModel,
    localStorage: new Backbone.LocalStorage("bb-col-demo")
  });

  var notesCollection = new NotesCollection();
  notesCollection.fetch(); // Use existing models!

  var $note = $("<div><h1>One Note</h1><div id='note' /></div>");
  var $notes = $("<div><h1>My Notes</h1><div id='notes' /></div>");

  var NoteView = Backbone.View.extend({
    el: "#note",
    template: noteTmpl,
    initialize: function () {
      if (!this.model) { throw new Error("MODEL!!!!"); }
      this.listenTo(this.model, "change", this.render);
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

  var NotesView = Backbone.View.extend({
    el: "#notes",
    template: notesTmpl,
    initialize: function () {
      if (!this.collection) { throw new Error("COLLECTION!!!!"); }
      this.listenTo(this.collection, "change", this.render);
    },
    render: function () {
      this.$el.html(this.template(this.collection.toJSON()));
    }
  });

  // --------------------------------------------------------------------------
  // Application Bootstrap
  // --------------------------------------------------------------------------
  $(function () {
    $("body")
      .append($note)
      .append($notes);

    var noteView = new NoteView({
      model: notesCollection.at(0)
    });
    noteView.render();

    var notesView = new NotesView({
      collection: notesCollection
    });
    notesView.render();

  });
});












