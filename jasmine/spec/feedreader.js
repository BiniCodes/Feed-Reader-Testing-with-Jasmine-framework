/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

 /* All tests are written within the $() function, to ensure
 that all events run when the DOM is ready (and not before) */

$(function() {
   
    // First test suite: RSS feeds definition 
    describe('RSS Feeds', function() {
        /* First spec of 'RSS Feeds' makes sure that allFeeds variable is defined
        and it is not empty */
        
        it('allFeeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Second spec of 'RSS Feeds' makes sure that every feed in the allFeeds object
        has an URL defined which is not empty */
       it('url is defined and not empty', function(){

            for(let feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url).toContain('http');

            }       
         }); 

        /* Third spec of 'RSS Feeds' makes sure that every feed in the allFeeds object
        has a name defined which is not empty */
        it('name is defined and not empty', function(){

            for(let feed of allFeeds){
            expect(feed.name).toBeDefined();
            expect(feed.name).not.toBe('');

            }   
         }); 
    });


    // Second test suite: Menu functionality
   describe('The menu', function() {


         /* First spec of 'Menu functionality' makes sure that the menu element 
         is hidden by default */    

        it('menu element is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

        /* Second spec of 'Menu functionality' makes sure that the menu changes visibility
        after clicking the menu icon */  
        const icon = document.querySelector('.menu-icon-link');
          it('change menu visibility after clicking', function(){
            icon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            icon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });


    // Third test suite: Initial Entries
   describe('Initial Entries', function() {

         // Using beforeEach and done() as the loadFeed() function is asynchronous
         beforeEach(function(done){
            //Load feed and call done() to start spec 'should have at least a single entry element'
            loadFeed(0, done); 
         });

        /* This spec of 'Initial Entries' makes sure that there is an .entry element
        within the .feed container after calling loadFeed() */  

      
        //Spec starts after done() is called in beforeEach()
         it("should have at least a single entry element", function(){
            //Select .entry class of .feed
            let entries = document.querySelector('.feed').getElementsByClassName('entry');

            expect(entries.length).not.toBe(0);
            //Call done() to let this spec complete
         });
    });


    // Fourth test suite: New Feed functionality is working
    describe('New Feed Selection', function() {

        /* This spec of 'New Feed Selection' makes sure that the content of a
        new feed has changed after calling the loadFeed function*/  
 
        // Function to select the inner HTML of .feed
         function feedSelection(){
            return document.querySelector('.feed').innerHTML;
        }

        //Declare oldFeed variable
        let oldFeed;

        // Using beforeEach as the loadFeed() function is asynchronous
        beforeEach(function(done){
            //Load feed
            loadFeed(0, function(){
                //Calling feedSelection() for the old feed
                oldFeed = feedSelection();
                //Load new feed    
                loadFeed(1, done);
            });
        });

        //Spec starts after done() is called in beforeEach()
         it("content changed", function(){
            //Calling feedSelection() for the new feed
            let newFeed = feedSelection();
            /*The inner HTML of the old feed should be different from the
            inner HTML of the new feed */
            expect(oldFeed).not.toBe(newFeed);
         });
    });
  
}());
