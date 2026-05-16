type GTMEvent = {
    event: string;
    [key: string]: unknown;
};

export function pushEvent(event: GTMEvent) {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
}

export function trackCtaClick(params: {
    cta_id: string;
    cta_location: string;
    cta_label?: string;
    cta_destination?: string;
}) {
    pushEvent({ event: 'cta_click', ...params });
}

export function trackFormSubmit(params: {
    form_id: string;
    status: 'success' | 'error';
    error_message?: string;
}) {
    pushEvent({ event: 'form_submit', ...params });
}
