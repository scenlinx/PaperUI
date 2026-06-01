import * as params from '@params';

const instances = [];

let fuse;

const defaultFuseOptions = {
    distance: 100,
    threshold: 0.4,
    ignoreLocation: true,
    keys: ['title', 'permalink', 'summary', 'content']
};

const buildFuseOptions = () => {
    if (!params.fuseOpts) {
        return defaultFuseOptions;
    }
    return {
        isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
        includeScore: params.fuseOpts.includescore ?? false,
        includeMatches: params.fuseOpts.includematches ?? false,
        minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
        shouldSort: params.fuseOpts.shouldsort ?? true,
        findAllMatches: params.fuseOpts.findallmatches ?? false,
        keys: params.fuseOpts.keys ?? defaultFuseOptions.keys,
        location: params.fuseOpts.location ?? 0,
        threshold: params.fuseOpts.threshold ?? defaultFuseOptions.threshold,
        distance: params.fuseOpts.distance ?? defaultFuseOptions.distance,
        ignoreLocation: params.fuseOpts.ignorelocation ?? defaultFuseOptions.ignoreLocation
    };
};

const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => fn(...args), delay);
    };
};

const closeSearchModal = () => {
    const modal = document.getElementById('searchModal');
    if (modal) {
        modal.classList.remove('active');
    }
};

const clearInstance = (inst) => {
    inst.resList.innerHTML = '';
    inst.sInput.value = '';
    inst.firstResult = null;
    inst.lastResult = null;
};

const reset = () => {
    for (const inst of instances) {
        clearInstance(inst);
    }
    closeSearchModal();
};

const setActiveResult = (element) => {
    document.querySelectorAll('.focus').forEach((item) => item.classList.remove('focus'));
    if (!element) return;
    element.focus();
    element.parentElement?.classList.add('focus');
};

const renderResults = (results, resList) => {
    const matches = instances.filter(i => i.resList === resList);
    if (matches.length === 0) return;

    matches.forEach(inst => {
        inst.resList.innerHTML = '';
        inst.firstResult = null;
        inst.lastResult = null;
    });

    if (!Array.isArray(results) || results.length === 0) {
        return;
    }

    const fragment = document.createDocumentFragment();

    for (const result of results) {
        const li = document.createElement('li');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.classList.add('feather', 'feather-chevrons-right');
        svg.innerHTML = '<polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline>';

        const link = document.createElement('a');
        link.className = 'entry-link';
        link.href = result.item.permalink;
        link.setAttribute('aria-label', result.item.title);
        link.textContent = result.item.title;

        li.appendChild(link);
        li.appendChild(svg);
        fragment.appendChild(li);
    }

    matches[0].resList.appendChild(fragment);

    const firstChild = matches[0].resList.firstElementChild;
    const lastChild = matches[0].resList.lastElementChild;
    matches.forEach(inst => {
        inst.firstResult = firstChild;
        inst.lastResult = lastChild;
    });
};

const performSearch = (sInput, resList) => {
    if (!fuse) return;
    const query = sInput.value.trim();
    if (!query) {
        renderResults([], resList);
        return;
    }
    const searchOptions = params.fuseOpts?.limit ? { limit: params.fuseOpts.limit } : undefined;
    const results = searchOptions ? fuse.search(query, searchOptions) : fuse.search(query);
    renderResults(results, resList);
};

const initSearch = async () => {
    const searchPairs = [
        { input: 'searchInput', results: 'searchResults' },
        { input: 'modalSearchInput', results: 'modalSearchResults' },
        { input: 'homeSearchInput', results: 'modalSearchResults' }
    ];

    for (const pair of searchPairs) {
        const sInput = document.getElementById(pair.input);
        const resList = document.getElementById(pair.results);
        if (sInput && resList) {
            const inst = { sInput, resList, firstResult: null, lastResult: null };
            instances.push(inst);
            sInput.disabled = false;
            if (sInput.id === 'searchInput') {
                sInput.focus();
            }
            if (sInput.id === 'homeSearchInput') {
                sInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const modal = document.getElementById('searchModal');
                        const modalInput = document.getElementById('modalSearchInput');
                        const modalResults = document.getElementById('modalSearchResults');
                        if (modal && modalInput && modalResults) {
                            modal.classList.add('active');
                            modalInput.value = sInput.value;
                            performSearch(modalInput, modalResults);
                            setTimeout(() => {
                                modalInput.focus();
                                modalInput.setSelectionRange(modalInput.value.length, modalInput.value.length);
                            }, 100);
                        }
                    }
                });
            } else {
                sInput.addEventListener('input', debounce(() => performSearch(sInput, resList), 150));
                sInput.addEventListener('search', () => {
                    if (!sInput.value) {
                        resList.innerHTML = '';
                    }
                });
            }
        }
    }

    if (instances.length === 0) return;

    const modal = document.getElementById('searchModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                const modalInst = instances.find(i => i.sInput.id === 'modalSearchInput');
                if (modalInst) clearInstance(modalInst);
            }
        });
    }

    try {
        const response = await fetch('/index.json');
        if (!response.ok) throw new Error(`Search index load failed: ${response.status}`);
        const data = await response.json();
        if (data) {
            fuse = new Fuse(data, buildFuseOptions());
        }
    } catch (error) {
        console.error(error);
    }
};

window.addEventListener('load', initSearch);

document.addEventListener('keydown', (event) => {
    const { key } = event;
    const active = document.activeElement;
    const currentInst = instances.find(inst => inst.sInput === active || inst.resList.contains(active));

    if (key === 'Escape') {
        reset();
        return;
    }

    if (!currentInst || !currentInst.firstResult) return;

    const { sInput, resList, firstResult, lastResult } = currentInst;

    if (key === 'ArrowDown') {
        event.preventDefault();
        if (active === sInput) {
            setActiveResult(firstResult.querySelector('.entry-link'));
        } else if (active?.parentElement !== lastResult) {
            setActiveResult(active?.parentElement?.nextElementSibling?.querySelector('.entry-link'));
        }
    } else if (key === 'ArrowUp') {
        event.preventDefault();
        if (active?.parentElement === firstResult) {
            setActiveResult(sInput);
        } else if (active !== sInput) {
            setActiveResult(active?.parentElement?.previousElementSibling?.querySelector('.entry-link'));
        }
    } else if (key === 'ArrowRight') {
        if (active?.matches?.('.entry-link')) {
            active.click();
        }
    }
});
