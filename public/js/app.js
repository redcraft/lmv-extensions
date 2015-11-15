var viewer;

function initialize() {
    var options = {
        'document' : 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cmVkYnVja2V0L3JlZC5mM2Q=',
        'env':'AutodeskProduction',
        'getAccessToken': getToken,
        'refreshToken': getToken,
    };
    var viewerElement = document.getElementById('viewer');
    viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerElement,
        {extensions: ['Autodesk.ADN.Viewing.Extension.ExtensionManager'], apiUrl: 'api/extensions', extensionsUrl: '/extensions', extensionsSourceUrl: '/extensions'});
    Autodesk.Viewing.Initializer(
        options,
        function() {
            viewer.start();
            loadDocument(viewer, options.document);
        }
    );
}

// This method returns a valid access token  For the Quick Start we are just returning the access token
// we obtained in step 2.  In the real world, you would never do this.
function getToken() {
    return "ttTJg1888We08e6AmSyD960zEFVx";
}

function loadDocument(viewer, documentId) {
    // Find the first 3d geometry and load that.
    Autodesk.Viewing.Document.load(
        documentId,
        function(doc) {// onLoadCallback
            var geometryItems = [];
            geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {
                'type' : 'geometry',
                'role' : '3d'
            }, true);
            if (geometryItems.length > 0) {
                viewer.load(doc.getViewablePath(geometryItems[0]));
            }
        },
        function(errorMsg) {// onErrorCallback
            alert("Load Error: " + errorMsg);
        }
    );
}

$(document).ready(function() {
    initialize();
})