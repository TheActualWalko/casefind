import {one, many, chain} from './query';

// export const getStudentsForSubject = (domain, subjectName) => many(
//   `
//     SELECT id, name, email 
//     FROM students 
//     WHERE id IN (
//       SELECT student_id 
//       FROM student_subjects 
//       WHERE subject_id IN (
//         SELECT id FROM subjects WHERE name = ? 
//       )
//     )
//     AND client_id IN (
//       SELECT id 
//       FROM clients 
//       WHERE domain = ?
//     );
//   `,
//   [subjectName, domain]
// );

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