export function useSpellscrollMessaging()
{
    if (!window?.spellscrollQuery) throw new Error('App is not running inside a Spellscroll instance!');

    return (action, options = {}) => new Promise((resolve, reject) =>
    {
        const {body} = options;
        window.spellscrollQuery({
            request: JSON.stringify(body !== undefined ? {action, data: body} : {action}),
            onSuccess: (raw) =>
            {
                if(raw == null || raw === "null")
                {
                    resolve({
                        ok: true,
                        json: () => {},
                        text: () => "",
                    });
                    return;
                }

                const parsed = JSON.parse(raw);
                if (!parsed.ok)
                {
                    reject(new Error(parsed.error ?? 'Unknown error'));
                    return;
                }

                resolve({
                    ok: true,
                    json: () => parsed.data,
                    text: () => typeof parsed.data === 'string' ? parsed.data : JSON.stringify(parsed.data),
                });
            },
            onFailure: (_code, message) => reject(new Error(message ?? 'Query failed')),
        });
    });
}