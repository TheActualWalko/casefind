import {one, many, chain} from './query';
import getMatchRegions from './get-match-regions';

export const search = (searchText) => many(
  `
    SELECT
      cases.id AS id,
      cases.name AS name,
      cases.year AS year,
      notes.content AS note
    FROM cases
    LEFT JOIN notes
    ON (cases.id = notes.case_id)
    WHERE cases.name LIKE ?
    OR cases.year LIKE ?
    OR notes.content LIKE ?;
  `,
  [`%${searchText}%`, `%${searchText}%`, `%${searchText}%`],
  (result) => ({
    ...result,
    nameHighlights: getMatchRegions(result.name, searchText),
    yearHighlights: getMatchRegions(String(result.year), searchText),
    noteHighlights: getMatchRegions(result.note, searchText)
  })
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