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
  "backbone",

  // Import and compile a HBS template.
  // For real application, remove this import (and the real file) and replace
  // with imports for your Backbone components needed to bootstrap the full
  // application. Likely this means a collection and router.
  "hbs!app/templates/hello",

  // Polyfill JSON for old browsers.
  "json2",
  "backbone.localStorage"
], function (
  $,
  Backbone,
  helloTmpl
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

  // _.each(["Hi", "Hello", "Hola"], function (msg) {
  //   notesCollection.create({ title: msg, text: msg });
  // });

  notesCollection.fetch(); // Use existing models!
  notesCollection.chain()
    .filter(function (model) {
      return /o/.test(model.get("text"));
    })
    .each(function (model) {
      console.log("HAS O: " + JSON.stringify(model.toJSON()));
    });

  // --------------------------------------------------------------------------
  // Application Bootstrap
  // --------------------------------------------------------------------------
  $(function () {
    $("body")
      .append($("<h2>Hello CascadiaJS!</h2>"));
  });
});












