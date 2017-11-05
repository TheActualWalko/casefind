import {one, many, chain} from './query';

export const search = (searchText, types) => {
  const typeStatements = ['fact', 'decision', 'other']
    .filter(t => types[t] === false)
    .map(t => `notes.type != ${t}`);

  const typeString = typeStatements.length === 0 
    ? ';' 
    : `AND ${typeStatements.join(' OR ')};`;

  return many(
    `
      SELECT
        notes.id AS id,
        cases.id AS caseId,
        cases.name AS name,
        cases.year AS year,
        notes.content AS note,
        notes.type AS type
      FROM cases
      LEFT JOIN notes
      ON (cases.id = notes.case_id)
      WHERE (cases.name LIKE ?)
      ${typeString}
    `,
    [`%${searchText}%`, `%${searchText}%`, `%${searchText}%`]
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