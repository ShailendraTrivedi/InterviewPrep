# 📘 Enhanced MongoDB Interview Questions

---

## Fundamentals & Concepts

**1. What is MongoDB, and what are its core features and advantages?**  
   - Cover: document model, schema flexibility, horizontal scaling, rich query language, and when you would choose it over other databases.

**2. How does MongoDB differ from traditional relational database management systems (RDBMS)?**  
   - Compare: data model (documents vs rows/columns), schema (flexible vs fixed), joins vs embedding/references, ACID scope, and scaling approach (vertical vs horizontal).

**3. What are documents and collections in MongoDB, and how do they relate to tables and rows in relational databases?**  
   - Explain the mapping (collection ↔ table, document ↔ row), and discuss why document size limits (16MB) and nesting matter for schema design.

**4. How is data physically stored and managed internally in MongoDB?**  
   - Discuss: storage engine (WiredTiger default), data files, journaling, memory-mapped files, and how documents are laid out on disk.

**5. What is BSON, and why is it important in MongoDB’s data storage and processing?**  
   - Define BSON, contrast with JSON (types, size, binary format), and explain its role in storage, indexing, and type-safe operations.

---

## Tools & Querying

**6. What is the Mongo Shell, and how is it used to interact with MongoDB?**  
   - Describe: `mongosh` vs legacy `mongo`, connection string, CRUD and admin commands, and when you’d use it vs drivers or Compass.

**7. What is a cursor in MongoDB, and in what scenarios is it used?**  
   - Explain: lazy evaluation, batch size, iteration in drivers, and when to use cursors vs `.toArray()` (memory and streaming).

**8. How do you perform basic query operations in MongoDB?**  
   - Cover: `find()` with filter and projection, comparison and logical operators (`$eq`, `$in`, `$and`, `$or`), and when to use which.

**9. What is the syntax for performing CRUD (Create, Read, Update, Delete) operations in MongoDB?**  
   - Give examples: `insertOne`/`insertMany`, `find`/`findOne`, `updateOne`/`updateMany` (including `$set`, `$unset`), `deleteOne`/`deleteMany`, and optionally `replaceOne`.

**10. What is the Aggregation Framework in MongoDB, and how does it differ from basic queries?**  
    - Compare: declarative pipeline vs `find()`, stages vs single query, and when to use aggregation for grouping, reshaping, and analytics.

**11. What are Aggregation Pipelines, and how are they structured and executed in MongoDB?**  
    - Explain: concept of stages (`$match`, `$group`, `$lookup`, `$sort`, `$project`), order of execution, and how to optimize (early `$match`, indexes).

---

## Indexes & Performance

**12. What is an index in MongoDB, and how do you create and manage indexes?**  
    - Define index purpose (speed vs write cost). Show: single-field, compound, multikey indexes; `createIndex()`; `listIndexes()`; when to drop or rebuild.

**13. What are TTL (Time-To-Live) indexes, and in which scenarios are they useful?**  
    - Explain: expiry based on date field, background removal, and use cases (sessions, logs, temporary data). Mention single-field and background index constraints.

**14. How can query performance be optimized in MongoDB?**  
    - Cover: indexing strategy, `explain()` and execution plans, projection to limit fields, avoiding large skips, and connection pooling. Optionally: aggregation and read preference.

---

## Consistency, Writes & Transactions

**15. How does MongoDB ensure data consistency across operations?**  
    - Discuss: document-level atomicity, optional multi-document transactions, read concern, write concern, and how replication affects consistency.

**16. What is Write Concern in MongoDB, and why is it important for data reliability?**  
    - Define: `w` (ack from primary vs majority), `wtimeout`, `j` (journal), and trade-offs between durability, latency, and availability.

**17. How does MongoDB handle multi-document transactions?**  
    - Explain: ACID over multiple docs/collections, `startTransaction`/`commitTransaction`/`abortTransaction`, snapshot isolation, and limitations (e.g., time limit, replica set requirement).

---

## Replication & High Availability

**18. What is replication in MongoDB, and how does its architecture work?**  
    - Describe: replica set, primary and secondaries, oplog, automatic failover, and how replication supports durability and read scaling.

**19. What are replica sets in MongoDB, and how do they contribute to high availability?**  
    - Cover: election process, majority, arbiter, and how failover and read preference (primary vs secondary) affect availability and consistency.

**20. How does MongoDB achieve horizontal scalability?**  
    - Explain: sharding as the mechanism, role of replica sets per shard, and how application and ops work change when you scale out.

**21. What is sharding in MongoDB, and how does it distribute data across clusters?**  
    - Describe: shard key, config servers, mongos, chunks, and how data is split and balanced across shards.

**22. What are the different sharding strategies available in MongoDB?**  
    - Compare: range-based, hash-based, and zone/tag-based sharding; discuss impact on query patterns, hotspotting, and chunk distribution.

**23. How does MongoDB ensure high availability in production environments?**  
    - Tie together: replica sets, automatic failover, majority write concern, monitoring, and operational practices (e.g., backups, rolling upgrades).

---

## Operations & Security

**24. What are the best practices for deploying MongoDB in a production environment?**  
    - Cover: hardware/OS tuning, security (auth, network), monitoring, backups, capacity planning, and upgrade strategy.

**25. How do you implement authentication and access control in MongoDB?**  
    - Explain: authentication mechanisms (SCRAM, x.509, LDAP), roles (built-in and custom), and principle of least privilege with examples.

**26. How do you import and export data in MongoDB?**  
    - Describe: `mongodump`/`mongorestore`, `mongoexport`/`mongoimport` (JSON/CSV), and when to use each (backup vs migration vs analytics).

**27. What strategies can be used for backup and disaster recovery in MongoDB?**  
    - Compare: filesystem snapshots, `mongodump`/`mongorestore`, and continuous backup/point-in-time recovery; include RTO/RPO and testing.

**28. How do you monitor and troubleshoot performance issues in MongoDB?**  
    - Cover: serverStatus, currentOp, explain plans, slow query log, and key metrics (connections, lock, replication lag). Optionally: Atlas or third-party tools.

---

## Schema Design & Migration

**29. What are the key considerations when designing schemas and modeling data in MongoDB?**  
    - Discuss: embedding vs referencing, cardinality (one-to-few, one-to-many, one-to-squillions), growth patterns, and access patterns (reads vs writes).

**30. What are the steps involved in migrating data from a relational database (e.g., MySQL) to MongoDB?**  
    - Outline: schema mapping (tables → collections, joins → embed/lookup), ETL/migration tools, validation, rollback plan, and application changes.

**31. What are the major differences between MongoDB and MySQL in terms of architecture, scalability, and use cases?**  
    - Compare: data model, scaling (replica sets + sharding vs read replicas + partitioning), transactions, and typical use cases (flexible schema, analytics, high write throughput vs traditional OLTP).

---

## Bonus / Advanced

**32. How would you debug a slow aggregation pipeline in production?**  
    - Walk through: `explain`, index usage, stage order, `allowDiskUse`, and reducing working set (e.g., early `$match`).

**33. When would you use `$lookup` (aggregation) vs embedding or application-level joins?**  
    - Discuss: data size, update frequency, query patterns, and trade-offs between flexibility, performance, and consistency.

**34. Explain read preference and read concern in MongoDB. How do they affect consistency and availability?**  
    - Cover: primary vs primaryPreferred vs secondary vs nearest; local vs available vs majority vs linearizable; and when to use each.
