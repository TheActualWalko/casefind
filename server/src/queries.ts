import {one, many, chain} from './query';

export const search = (searchText) => many(
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
    WHERE cases.name LIKE ?
    OR cases.year LIKE ?
    OR notes.content LIKE ?;
  `,
  [`%${searchText}%`, `%${searchText}%`, `%${searchText}%`],
  // (result) => {
  //   const noteMatchStart = result.note.indexOf(searchText);
  //   return {
  //     ...result,
  //     note: noteMatchStart >= 0
  //       ? `${
  //           noteMatchStart > 15 ? '...' : ''
  //         }${
  //           result.note.slice(
  //             Math.max(noteMatchStart - 15, 0),
  //             noteMatchStart + searchText.length + 15
  //           )
  //         }${
  //           noteMatchStart + searchText.length + 15 < result.note.length ? '...' : ''
  //         }`
  //       : null
  //   }
  // }
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