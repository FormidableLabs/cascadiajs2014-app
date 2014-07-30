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
  var noteModel = notesCollection.at(0);
  var renderedNote = noteTmpl(noteModel.toJSON());
  $note.append(renderedNote);

  var $notes = $("<div><h1>My Notes</h1><div id='notes' /></div>");
  var renderedNotes = notesTmpl(notesCollection.toJSON());
  $notes.append(renderedNotes);

  // --------------------------------------------------------------------------
  // Application Bootstrap
  // --------------------------------------------------------------------------
  $(function () {
    $("body")
      .append($note)
      .append($notes);
  });
});












