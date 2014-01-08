(function (travi) {
    'use strict';

    function restore(toRestore) {
        function restoreFunction(functionName) {
            if (functionName.restore) {
                functionName.restore();
            }
        }

        if ($.isArray(toRestore)) {
            $(toRestore).each(function () {
                restoreFunction(this);
            });
        } else {
            restoreFunction(toRestore);
        }
    }

    function stubGetTemplates() {
        sinon.stub(travi.templates, 'get', function () {
            var deferred = new $.Deferred(),
                promise = deferred.promise();

            deferred.resolve();

            return promise;
        });
    }

    function assertObjectsHaveSameValues(expected, actual) {
        var key;

        for (key in expected) {
            if (expected.hasOwnProperty(key)) {
                assertEquals(expected[key], actual[key]);
            }
        }
    }

    function assertAjaxCallMadeWith(expected, actual) {
        this.assertObjectsHaveSameValues(expected, actual);
    }

    travi.namespace('test.common', {
        restore: restore,
        stubGetTemplates: stubGetTemplates,
        assertObjectsHaveSameValues: assertObjectsHaveSameValues,
        assertAjaxCallMadeWith: assertAjaxCallMadeWith
    });
}(travi));

(function (travi) {
    'use strict';

    function float(max) {
        if (undefined === max || 0 > max) {
            max = 100;
        }

        return Math.random() * max;
    }

    function int(max) {
        return Math.floor(float(max));
    }

    function string(length) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            randomString = '',
            randomNumber,
            i;

        length = length || 8;
        for (i = 0; i < length; i += 1) {
            randomNumber = int(chars.length);
            randomString += chars.substring(randomNumber, randomNumber + 1);
        }

        return randomString;
    }

    travi.namespace('test.any', {
        int: int,
        float: float,
        string: string
    });
}(travi));

(function (travi) {
    'use strict';

    var callbacks = {};

    function stub() {
        sinon.stub(travi.events, 'subscribe', function (name, callback) {
            callbacks[name] = callback;
        });
    }

    function publish(name, data) {
        var callback = callbacks[name];

        if (callback) {
            callback(data);
        } else {
            throw 'No callback cached for event: ' + name;
        }
    }

    function restore() {
        callbacks = {};
        travi.test.common.restore(travi.events.subscribe);
    }

    travi.namespace('test.events', {
        stub: stub,
        publish: publish,
        restore: restore
    });
}(travi));

(function (travi) {
    'use strict';

    var callbacks = {};

    function stub() {
        sinon.stub(travi.templates, 'render', function (templateName, data, callback) {
            assertObject(data);
            assertFunction(callback);
            callbacks[templateName] = callback;
        });
    }

    function render(templateName, renderedTemplate) {
        var callback = callbacks[templateName];

        if (callback) {
            callback(renderedTemplate);
        } else {
            throw 'No callback cached for template: ' + templateName;
        }
    }

    function restore() {
        callbacks = {};
        travi.test.common.restore(travi.templates.render);
    }

    travi.namespace('test.templates', {
        stub: stub,
        render: render,
        restore: restore
    });
}(travi));