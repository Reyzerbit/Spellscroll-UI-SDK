'use strict';

function useSpellscrollMessaging()
{
    if (!window?.spellscrollQuery) throw new Error('App is not running on a Spellscroll JCEF instance!');

    return (action, data, onSuccess, onFailure) => window.spellscrollQuery({
        request:   JSON.stringify({ action, data }),
        onSuccess,
        onFailure,
    });
}

module.exports = { useSpellscrollMessaging };
