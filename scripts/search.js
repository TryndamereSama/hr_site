// MC1 HUB — Search Engine
import { getLocalizedNoticias } from './data/noticias.js';
import { beneficios } from './data/beneficios.js';
import { manuais } from './data/manuais.js';
import { treinamentos } from './data/treinamentos.js';
import { links } from './data/links.js';
import { contatos } from './data/contatos.js';

// ─── Normalize text for diacritic-insensitive search ───
function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// ─── Build flat search index from all data sources ───
let searchIndex = [];

export async function buildSearchIndex() {
  const noticias = await getLocalizedNoticias();
  searchIndex = [
    ...noticias.map(n => ({
      id: n.id,
      type: 'noticia',
      typeLabel: 'Notícia',
      title: n.title,
      subtitle: n.dateLabel,
      keywords: normalize(`${n.title} ${n.excerpt} ${n.category} ${n.tag}`),
      href: `#/noticia/${n.id}`,
      gradient: n.gradient,
    })),
    ...beneficios.map(b => ({
      id: b.id,
      type: 'beneficio',
      typeLabel: 'Benefício',
      title: b.name,
      subtitle: b.category,
      keywords: normalize(`${b.name} ${b.shortDesc} ${b.category} ${b.provider}`),
      href: '#/rh',
      gradient: b.gradient,
    })),
    ...manuais.map(m => ({
      id: m.id,
      type: 'manual',
      typeLabel: 'Documento',
      title: m.name,
      subtitle: m.category,
      keywords: normalize(`${m.name} ${m.description} ${m.category} ${(m.tags || []).join(' ')}`),
      href: '#/politicas',
      gradient: m.gradient,
    })),
    ...treinamentos.map(t => ({
      id: t.id,
      type: 'treinamento',
      typeLabel: 'Treinamento',
      title: t.title,
      subtitle: `${t.category} · ${t.durationLabel}`,
      keywords: normalize(`${t.title} ${t.description} ${t.category} ${t.instructor} ${(t.tags || []).join(' ')}`),
      href: '#/treinamentos',
      gradient: t.gradient,
    })),
    ...links.map(l => ({
      id: l.id,
      type: 'link',
      typeLabel: 'Link',
      title: l.name,
      subtitle: l.category,
      keywords: normalize(`${l.name} ${l.description} ${l.category}`),
      href: l.isExternal ? l.url : l.url,
      isExternal: l.isExternal,
      gradient: l.gradient,
    })),
    ...contatos.map(c => ({
      id: c.id,
      type: 'contato',
      typeLabel: 'Contato',
      title: c.name,
      subtitle: c.role,
      keywords: normalize(`${c.name} ${c.role} ${c.department} ${(c.areas || []).join(' ')}`),
      href: '#/contato',
      gradient: `linear-gradient(135deg, #004b71, #006494)`,
    })),
  ];

  return searchIndex;
}

// ─── Query the search index ───
export function searchQuery(query, limit = 12) {
  if (!query || query.trim().length < 2) return [];

  const q = normalize(query.trim());
  const terms = q.split(/\s+/);

  const scored = searchIndex
    .map(item => {
      // Score: title match scores higher than keywords match
      let score = 0;
      const titleNorm = normalize(item.title);
      terms.forEach(term => {
        if (titleNorm.startsWith(term))      score += 10;
        else if (titleNorm.includes(term))   score += 6;
        else if (item.keywords.includes(term)) score += 2;
      });
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}

// ─── Group results by type ───
export function groupResults(results) {
  const groups = {};
  results.forEach(r => {
    if (!groups[r.type]) groups[r.type] = { label: r.typeLabel, items: [] };
    groups[r.type].items.push(r);
  });
  return groups;
}
