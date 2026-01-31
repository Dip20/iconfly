import fs from 'node:fs';
import path from 'node:path';

export default class IconsService {
    constructor() {
        this.icons = [];
        this.CDN_BASE_URL =
            'https://cluster.blr1.cdn.digitaloceanspaces.com/fontsawesome/svgs';

        this.benchmark('System Startup');
        this.loadIcons();
    }

    loadIcons() {
        const filePath = path.join(process.cwd(), 'meta-icons.json');

        try {
            const data = fs.readFileSync(filePath, 'utf8');

            const rawIconsArray = JSON.parse(data.trim());
            this.icons = Array.isArray(rawIconsArray)
                ? rawIconsArray
                : Object.values(rawIconsArray);

            this.benchmark('Icon loaded Successfully');
        } catch (error) {
            console.error('Error loading icons:', error);
            this.icons = [];
        }
    }

    search({ query = '', page = 1, limit = 20 }) {
        this.benchmark('Search Starting');

        const normalizedQuery = query.toLowerCase().trim();
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        let results = this.icons;

        if (normalizedQuery) {
            results = this.icons.filter((icon) => {
                const label = icon.label?.toLowerCase() ?? '';
                const searchTerms = Array.isArray(icon.terms)
                    ? icon.terms.map((t) => t.toLowerCase())
                    : [];

                return (
                    label.includes(normalizedQuery) ||
                    searchTerms.some((term) =>
                        term.includes(normalizedQuery)
                    )
                );
            });
        }

        const paginatedResults = results
            .slice(startIndex, endIndex)
            .flatMap((icon) => {
                const freeStyles = icon.free || [];
                if (freeStyles.length === 0) return [];

                return freeStyles.map((style) => ({
                    key: icon.key,
                    label: icon.label,
                    style,
                    cdnUrl: `${this.CDN_BASE_URL}/${style}/${icon.key}.svg`,
                    terms: icon.terms,
                    unicode: icon.unicode,
                }));
            });

        this.benchmark('Searching Done');

        return {
            totalDocs: results.length,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(results.length / limit),
            data: paginatedResults,
        };
    }

    benchmark(label = 'Benchmark') {
        return true;
    }
}
