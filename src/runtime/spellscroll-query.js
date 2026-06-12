'use strict';

function useSpellscrollMessaging()
{
    if (!window?.spellscrollQuery) throw new Error('App is not running on a Spellscroll JCEF instance!');

    const queryFunc = (action, data, onSuccess, onFailure) => window.spellscrollQuery({
        request:   JSON.stringify({ action, data }),
        onSuccess,
        onFailure,
    });

    const supplierFunc = (action, onSuccess, onFailure) => window.spellscrollQuery({
        request: JSON.stringify({ action }),
        onSuccess,
        onFailure,
    });

    return {
        post: queryFunc,
        get: supplierFunc
    };
}

module.exports = { useSpellscrollMessaging };
