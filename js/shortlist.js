// Only load this script when the document is ready as it needs to run after.
$( document ).ready( function() {

  // Store main shortlist wrapper div as variable
  var shortlist = $( "#shortlist-container > .row" );

  // Check for localStorage support before running any more code
  if ( localStorage ) {

    // Add a link for the my-shortlist.html page to the bottom of "New Memorials" dropdown
    var newMemorialsDropdownShortlistItem = "<a class=\"dropdown-item\" id=\"dropdownMyShortlist\" href=\"../my-shortlist.html\">My Shortlist</a>";
    $( "#newMemorialsDropdown" ).append( newMemorialsDropdownShortlistItem );

    // Check if items already exist in localStorage
    if ( localStorage.length === 0 ) {

      // Create a message to be displayed if there are no items stored in the shortlist
      var emptyShortlistMsg = "<div class=\"col-12 px-3\"><h3>Your Shortlist is Empty</h3><p>To add items to your shortlist, please visit the New Memorials pages and use the \"Add To Shortlist\" button as seen in the example below.</p></div><div class=\"col-12 col-sm-6 col-md-6 col-lg-4\"><div class=\"card brochure-item-example\"><img class=\"card-img-top\" src=\"/images/new-memorials/lawn-memorials/Ainthorpe.jpg\" alt=\"Black granite headstone of camber top shape with decorative carved roses.\" itemprop=\"image\"><div class=\"card-body bg-slate-lightest\"><h4 class=\"card-title\" itemprop=\"name\">Example</h4><p class=\"card-text\" itemprop=\"description\">Shown in <strong class=\"text-slate-dark\">Your Shortlist</strong> as an example brochure item.</p></div><button class=\"btn btn-block btn-secondary example-add-to-shortlist\">Add To Shortlist</button></div></div>";

      // Prepend the empty shortlist message
      shortlist.prepend( emptyShortlistMsg );

    // If items do exist in localStorage then do the following:
    } else {

      // Create navbar link and button to clear the shortlist
      var navbarNavShortlistLink = "<a class=\"nav-item nav-link\" id=\"nav-my-shortlist\" href=\"../my-shortlist.html\">My Shortlist</a>";
      var shortlistClearButton = "<div class=\"col-12\"><button class=\"btn btn-secondary mb-5\" id=\"clearShortlist\">Clear Shortlist</button></div>";

      // Create the seperate arrays that will store the organised brochure items
      var shortlistItems = [];
      var shortlistLawnMemorials = [];
      var shortlistChurchyardMemorials = [];
      var shortlistChildrensMemorials = [];
      var shortlistKerbs = [];
      var shortlistKerbExtra = [];
      var shortlistChippings = [];
      var shortlistVases = [];
      var shortlistPlaques = [];

      // Store data regarding each array to be sorted
      var shortlistData = [
        [ "^LM_", shortlistLawnMemorials, "Lawn Memorials", 4 ],
        [ "^CY_", shortlistChurchyardMemorials, "Churchyard Memorials", 4 ],
        [ "^CM_", shortlistChildrensMemorials, "Children&#39;s Memorials", 4 ],
        [ "^K_", shortlistKerbs, "Kerbs", 6 ],
        [ "^KE_", shortlistKerbExtra, "Kerb Extras", 4 ],
        [ "^CHIP_", shortlistChippings, "Chippings", 4 ],
        [ "^V_", shortlistVases, "Vases", 4 ],
        [ "^P_", shortlistPlaques, "Plaques", 4 ]
      ];

      // Add a link to the my-shortlist.html page to the end of the site navigation
      $( "#siteNavbar > .navbar-nav" ).append( navbarNavShortlistLink );

      // Add a button to the top of the shortlist wrapper div that clears the full shortlist on click.
      shortlist.prepend( shortlistClearButton );

      // Clear the shortlist and reload the page when the "#clearShortlist" button is clicked
      $( "#clearShortlist" ).click( function() {
        localStorage.clear();
        window.location.reload();
      });

      // Loop localStorage items and push to relevent array
      Object.keys( localStorage ).forEach( function( key ) {

        // Function to check the item prefix and push to the appropriate array
        var checkStorage = function ( prefix, shortlistArray ) {
          if ( key.match( prefix ) ) {
            shortlistArray.push( localStorage.getItem( key ) );
          }
        };

        // Loops the localStorage data and run it through the checkStorage function
        var shortlistDataLength = shortlistData.length;
        for ( var i = 0; i < shortlistDataLength; i++ ) {
          checkStorage( shortlistData[i][0], shortlistData[i][1] );
        }

      });

      var allItems = "";
      var showItems = function( arrayName, title, colSize ) {
        if ( arrayName.length != 0 ) {
          arrayName.sort();
          shortlistItems.push(arrayName);
          allItems += "<div class=\"col-12\"><h2>" + title + "</h2><hr/></div>";
          arrayName.forEach( function( key ) {
            if ( colSize === 4 ) {
              allItems += "<div class=\"col-12 col-sm-6 col-md-6 col-lg-4 mb-5\">" + key + "</div>";
            } else if ( colSize === 6 ) {
              allItems += "<div class=\"col-12 col-sm-12 col-md-6 col-lg-6 mb-5\">" + key + "</div>";
            }
          });
        }
      };

      var shortlistDataLength = shortlistData.length;
      for ( var i = 0; i < shortlistDataLength; i++ ) {
        showItems( shortlistData[i][1], shortlistData[i][2], shortlistData[i][3] );
      }

      shortlist.append( allItems );

    } // Close if for localStorage

      // add button with appropriate class depending on if the item is in localStorage
      $( ".brochure-item" ).each(function() {
        
        // Get item id to compare with localStorage
        var itemId = $(this).attr( "id" );
      
        // Does it exist in localStorage?
        if ( !localStorage.getItem(itemId) ) {
          if ( !$.contains( $(this), $( ".add-to-shortlist" ) ) ) {
            $(this).children( ".add-to-shortlist" ).remove();
            $(this).children( ".delete-from-shortlist" ).remove();
            $(this).append( "<button class=\"btn btn-block btn-secondary add-to-shortlist\">Add To Shortlist</button>" );
          }
        } else {
          if ( !$.contains( $(this), $( ".delete-from-shortlist" ) ) ) {
            $(this).children( ".add-to-shortlist" ).remove();
            $(this).children( ".delete-from-shortlist" ).remove();
            $(this).append( "<button class=\"btn btn-block btn-secondary delete-from-shortlist\">Remove From Shortlist</button>" );
          }
        }
    
      });

    //Function to show modal with appropriate content when brochure item button is clicked
    var doShortlistModal = function( modalTextOption, modalBrochureItem ) {
      var shortlistModal = $( "#shortlistModal" );
      shortlistModal.on( "show.bs.modal", function (e) {
        if ( modalTextOption === "Added" ) {
          $(this).find( "#shortlistModalTitle" ).text( "Added To Shortlist" );
          $(this).find( "#shortlistModalText" ).html( "Added <strong>" + modalBrochureItem + "</strong> to your shortlist." );
        } else if ( modalTextOption === "Removed" ) {
          $(this).find( "#shortlistModalTitle" ).text( "Removed From Shortlist" );
          $(this).find( "#shortlistModalText" ).html( "Removed <strong>" + modalBrochureItem + "</strong> from your shortlist." );
        }
      });
      shortlistModal.modal( "show" );
      shortlistModal.on( "hidden.bs.modal", function (e) {
        window.location.reload();
      });
    }; 

    // Capture "add to shortlist" click event
    $( ".add-to-shortlist" ).click( function() {

      // Get data from brochure item
      var brochureItemName = $(this).parent().attr( "id" );
      var brochureItemHTML = $(this).parent().parent().html();
      var brochureItemTitle = $(this).parent().find( ".card-title" ).text();

      // Store locally with unique name
      localStorage.setItem( brochureItemName, brochureItemHTML );

      doShortlistModal( "Added", brochureItemTitle );

    });

    // Capture delete from shortlist click event
    $( ".delete-from-shortlist" ).click( function() {

      // Get data from brochure item
      var brochureItemName = $(this).parent().attr( "id" );
      var brochureItemTitle = $(this).parent().find( ".card-title" ).text();

      // Remove from localStorage
      localStorage.removeItem( brochureItemName );

      doShortlistModal( "Removed", brochureItemTitle );

    });


  // If localStorage is not available
  } else {

    // Creat error message if the users browser does not support localStorage
    var shortlistBrowserSupportError = "<div class=\"col-12\"><h3>Your Web Browser Does Not Support Web Storage</h3><p>To add items to the shortlist your browser must support <em>localStorage</em>, this is a technology used to prevent the need for a database and sign-up when using Watson Memorials shortlisting features.</p></div>"

    // Prepend error message to shortlist wrapper
    shortlist.prepend( shortlistBrowserSupportError );

  }

});
