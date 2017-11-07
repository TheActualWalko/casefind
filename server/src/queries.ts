import {one, many, chain} from './query';

const previewWords = 30;
const previewBubbleCharacters = 50;

export const search = (searchText, types) => {
  const typeStatements = ['facts', 'decision', 'other']
    .filter(t => types[t] === false)
    .map(t => `notes.type != "${t}"`);

  const typeString = typeStatements.length === 0 
    ? '' 
    : `AND ${typeStatements.join(' AND ')}`;

  return many(
    `
      SELECT
        notes.id AS id,
        cases.id AS caseId,
        cases.name AS name,
        cases.year AS year,
        notes.content AS content,
        notes.type AS type
      FROM cases
      LEFT JOIN notes
      ON (cases.id = notes.case_id)
      WHERE (
        cases.name LIKE ?
        OR notes.content LIKE ?
        OR cases.year LIKE ?
      )
      ${typeString}
      LIMIT 11;
    `,
    [`%${searchText}%`, `%${searchText}%`, `%${searchText}%`],
    (result) => {
      const noteMatchStart = result.content.toLowerCase().indexOf(searchText.toLowerCase()) || 0;
      const contentCore = result.content
        .slice(Math.max(0, noteMatchStart - previewBubbleCharacters))
        .split(' ')
        .slice(0, previewWords)
        .join(' ');
      const content = `${
        result.content.startsWith(contentCore) ? '' : '...'
      }${
        contentCore
      }${
        result.content.endsWith(contentCore) ? '' : '...'
      }`;
      return {
        ...result,
        content
      }
    }
  );
};

export const track = (IS_DEV, ip, lat, lon, action, data) => one(
  `
    INSERT INTO activity (
      dev,
      ip,
      lat,
      lon,
      action,
      data
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    )
  `,
  [IS_DEV ? 1 : 0, ip, lat, lon, action, data]
);

export const getLastFortnightActivity = () => many(
  `
    SELECT 
      ip, 
      lat, 
      lon, 
      action, 
      data, 
      timestamp
    FROM 
      activity 
    WHERE timestamp >= now() - INTERVAL 2 WEEK AND dev = 0;
  `,
  []
);