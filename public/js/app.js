function initialize() {
    var options = {
        'document' : 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cmVkYnVja2V0L2N5bGluZGVyLmYzZA==',
        'env':'AutodeskProduction',
        'getAccessToken': getToken,
        'refreshToken': getToken,
    };
    var viewerElement = document.getElementById('viewer');
    var viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerElement,
        {extensions: ['Autodesk.ADN.Viewing.Extension.ExtensionManager'], apiUrl: 'api/extensions', extensionsUrl: '/extensions', extensionsSourceUrl: '/extensions'});
    Autodesk.Viewing.Initializer(
        options,
        function() {
            viewer.start();
            loadDocument(viewer, options.document);
        }
    );
}

function getToken() {
	var accessToken;

	$.ajax({
		type: "GET",
		url: "api/auth",
		async: false,
		success : function(data) {
			accessToken = $.parseJSON(data).access_token;
		}
	});

	return accessToken;
}

function loadDocument(viewer, documentId) {
    Autodesk.Viewing.Document.load(
        documentId,
        function(doc) {
            var geometryItems = [];
            geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {
                'type' : 'geometry',
                'role' : '3d'
            }, true);
            if (geometryItems.length > 0) {
                viewer.load(doc.getViewablePath(geometryItems[0]));
            }
        },
        function(errorMsg) {
            alert("Load Error: " + errorMsg);
        }
    );
}

$(document).ready(function() {
    initialize();
})