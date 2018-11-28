describe("Exercise 2: ", function() {
  describe("Define a Backbone View of a Model: ", function() {
    var myPersonView;

    beforeEach(function() {
      myPersonView = new PersonView({
        model: person
      });
    });

    it("store it as a variable called 'PersonView'", function() {
      expect(PersonView).not.toBeUndefined();
    });

    it("give your PersonView a className of 'rolodex'", function() {
      expect(myPersonView.$el.hasClass('rolodex')).toBe(true);
    });

    it("in .render, use jQuery to add an img tag to the $el", function() {
      myPersonView.render();
      expect(myPersonView.$('img').length).toBeGreaterThan(0);
    })

    it("in .render, use jQuery to add an src attribute to the img", function() {
      myPersonView.render();
      expect(myPersonView.$('img').attr('src')).toBeDefined();
    });

    it("use model.get('imgUrl') to populate the src tag", function() {
      myPersonView.render();
      expect(myPersonView.$('img').attr('src')).toEqual(myPersonView.model.get('imgUrl'));
    })

    it("make sure your .render function returns this", function() {
      var newView = Backbone.View.extend();
      var returnExpectation = myPersonView.render();
      expect(myPersonView.__proto__.render).not.toEqual(newView.__proto__.render);
      expect(returnExpectation).toEqual(myPersonView);
    });

    it("give your PersonView an events object, with an event for 'click' that has a callback of 'onClick'", function() {
      expect(myPersonView.events).toBeDefined();
      expect(typeof myPersonView.events).toEqual("object");
      var findClickEvent = function() {
        for (var event in myPersonView.events) {
          if ( /^click /.test(event) ) {
            return event;
          }
        }
      };
      var clickEvent = findClickEvent();
      expect(clickEvent).toBeDefined();
      expect(myPersonView.events[clickEvent]).toEqual('onClick');
    });

    it("make sure that 'onClick' is defined as a method on the PersonView", function() {
      expect(myPersonView.onClick).toBeDefined();
      $('body').append(myPersonView.render().$el);
      spyOn(myPersonView, 'onClick');
      myPersonView.delegateEvents();
      $('img').click();
      expect(myPersonView.onClick).toHaveBeenCalled();
      myPersonView.remove();
    });

    it("in the 'onClick' callback, do something fun (this test will always pass)", function() {
      expect(true).toBe(true);
    })
  });

  describe("Instantiate a new PersonView: ", function() {
    it("store it as a variable called 'personView'", function() {
      expect(personView).toBeDefined();
      expect(personView instanceof PersonView).toBe(true);
    });

    it("give your instantiated view a model. Use the one you previously instantiated and stored as person. Make sure the model has an 'imgUrl' attribute", function() {
      expect(personView.model).toBeDefined();
      expect(personView.model).toEqual(person);
      expect(personView.model.get('imgUrl')).toBeDefined();
    });
  });

  describe("In app.js, listen for $(document).ready(): ", function() {
    it("and when the document is ready, append your personView to the DOM", function() {
      var truth = $('.rolodex').length > 0 || $('img').length > 0;
      expect(truth).toBe(true);
      $('.rolodex').hide();
    });
  });
});