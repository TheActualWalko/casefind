import {one, many, chain} from './query';

const previewWords = 15;
const previewBubbleCharacters = 25;

export const search = (searchText, types) => {
  return many(
    `
      SELECT
        cases.id AS caseId,
        cases.content AS content,
        cases.name AS name,
        cases.year AS year,
        embeds.url AS embed,
        sources.name AS source
      FROM cases
      LEFT JOIN embeds
      ON (cases.id = embeds.case_id)
      LEFT JOIN sources
      ON (sources.id = embeds.source_id)
      WHERE (
        cases.name LIKE ?
        OR cases.content LIKE ?
        OR cases.year LIKE ?
      )
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
      const preview = `${
        result.content.startsWith(contentCore) ? '' : '...'
      }${
        contentCore
      }${
        result.content.endsWith(contentCore) ? '' : '...'
      }`;
      return {
        caseId: result.caseId,
        name: result.name,
        year: result.year,
        source: result.source,
        embed: result.embed,
        preview
      }
    }
  );
};

export const getCase = (id) => many(
  `
    SELECT
      cases.id AS caseId,
      cases.name AS name,
      cases.year AS year,
      cases.content AS content,
      embeds.url AS embed,
      sources.name AS source
    FROM cases
    LEFT JOIN embeds
    ON (cases.id = embeds.case_id)
    LEFT JOIN sources
    ON (sources.id = embeds.source_id)
    WHERE cases.id = ?;
  `,
  [id]
);

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