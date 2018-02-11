import {one, many, chain} from './query';

const previewWords = 15;
const previewBubbleCharacters = 25;

export const saveContent = (id, content) => one(
  `
    INSERT INTO content
    (case_id, value)
    VALUES
    (?, ?);
  `,
  [Number(id), content]
);

export const listCases = () => many(
  `
    SELECT
      id,
      name
    FROM
      cases;
  `,
  []
);

export const getContent = (caseId) => many(
  `
    SELECT
      value
    FROM
      content
    WHERE case_id = ?
    ORDER BY timestamp DESC LIMIT 1
  `,
  [Number(caseId)]
);

export const search = (searchText, types) => {
  return many(
    `
      SELECT
        cases.id AS caseId,
        cases.name AS name,
        cases.year AS year,
        content.value AS content,
        embeds.url AS embed,
        sources.name AS source
      FROM cases
      LEFT JOIN content
      ON (content.id = cases.content_id)
      LEFT JOIN embeds
      ON (cases.id = embeds.case_id)
      LEFT JOIN sources
      ON (sources.id = embeds.source_id)
      WHERE (
        cases.name LIKE ?
        OR content.value LIKE ?
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
      content.value AS content,
      embeds.url AS embed,
      sources.name AS source
    FROM cases
    LEFT JOIN content
    ON (content.id = cases.content_id)
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