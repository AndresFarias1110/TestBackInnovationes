'use strinct';
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const Query = {

    insertOne(db, collection, data) {
        return new Promise((done, rejected) => {
            client.connect(async(err) => {
                if (err) rejected(err);
                try {
                    const collect = client.db(db).collection(collection);
                    const insertResult = await collect.insertOne({
                        ...data,
                        created_at: Date.now(),
                        updated_at: null
                    });
                    client.close();
                    done(insertResult);
                } catch (error) {
                    client.close();
                    rejected(error);
                }
            });
        });
    },
    findAll(db, collection) {
        return new Promise((done, rejected) => {
            client.connect(async(err) => {
                if (err) rejected(err);
                try {
                    const collect = client.db(db).collection(collection);
                    const result = await collect.find({}).toArray();
                    client.close();
                    done(result);
                } catch (error) {
                    client.close();
                    rejected(error);
                }
            });
        });
    },
    update(db, collection, updateId, data) {
        return new Promise((done, rejected) => {
            client.connect(async(err) => {
                if (err) rejected(err);
                try {
                    const collect = client.db(db).collection(collection);
                    const result = await collect.updateOne(updateId, { $set: {
                        ...data,
                        updated_at: Date.now()
                    } });
                    client.close();
                    done(result);
                } catch (error) {
                    client.close();
                    rejected(error);
                }
            });
        });
    },
    delete(db, collection, deleteId) {
        return new Promise((done, rejected) => {
            client.connect(async(err) => {
                if (err) rejected(err);
                try {
                    const collect = client.db(db).collection(collection);
                    const result = await collect.deleteMany(deleteId);
                    client.close();
                    done(result);
                } catch (error) {
                    client.close();
                    rejected(error);
                }
            });
        });
    },
    createSchema(db, collection, data) {
        return new Promise((done, rejected) => {
            client.connect(async(err) => {
                if (err) rejected(err);
                try {
                    const collect = client.db(db).collection(collection);
                    const result = await collect.insertOne({
                        ... data,
                        created_at: Date.now(),
                        updated_at: null
                    });
                    client.close();
                    done(result);
                } catch (error) {
                    client.close();
                    rejected(error);
                }
            });
        });
    },
    findOne(db, collection, query) {
        return new Promise((done, rejected) => {
            client.connect(async(err) => {
                if (err) rejected(err);
                try {
                    const collect = client.db(db).collection(collection);
                    const result = await collect.findOne(query);
                    client.close();
                    done(result);
                } catch (error) {
                    client.close();
                    rejected(error);
                }
            });
        });
    },
}

module.exports = Query;