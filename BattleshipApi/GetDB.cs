using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using System.IO;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Diagnostics;

namespace BattleshipApi
{
    public class GetDB
    {
        public MongoClient mClient = null;
        public MongoServer globalserver = null;
        //public MongoDatabase dbMongoREAD = null;
        public string s_Database;
        public string s_ServerIP;

        public GetDB(string ip="", string db="")
        {
            s_ServerIP = ip;
            s_Database = db;
        }

        public MongoDatabase GetSystemDatabase(string strDatabase, string strCollection, ref MongoDatabase dbMongoREAD, ref string s_Database, ref string s_Collection)
        {
            //Retrieve server ip or name
            string s_mongo_ip = System.Configuration.ConfigurationManager.AppSettings["mongo_ip_address"];
            StringBuilder ConnectionStringUrl = new StringBuilder();
            string url = "Server=" + s_mongo_ip;

            if (s_ServerIP.Length > 0 && s_Database.Length > 0)
                url = "Server=" + s_ServerIP;

            s_Database = strDatabase;
            s_Collection = strCollection;

            try
            {
                if (dbMongoREAD == null)
                {
                    System.Net.WebProxy wprxWS = new System.Net.WebProxy();
                    wprxWS.Credentials = System.Net.CredentialCache.DefaultCredentials;

                    mClient = new MongoClient(url);
                    globalserver = mClient.GetServer();

                    MongoServer server = mClient.GetServer();

                    //Creating network connection;
                    dbMongoREAD = server.GetDatabase(s_Database);
                    if (dbMongoREAD == null)
                    {
                        //MessageBox.Show("Snaphsot could not make a connection to server for read/write");
                        return null;
                    }
                }

                return dbMongoREAD;
            }
            catch (MongoException me)
            {
                Trace.WriteLine(me.Message);
            }

            //Could not connect to network!
            return null;
        }

        public MongoDatabase GetSystemDatabaseSPT(ref MongoDatabase dbMongoREAD, string s_mongo_ip, string database, string collection)
        {
            string url = "Server=" + s_mongo_ip;

            try
            {
                if (dbMongoREAD == null)
                {
                    System.Net.WebProxy wprxWS = new System.Net.WebProxy();
                    wprxWS.Credentials = System.Net.CredentialCache.DefaultCredentials;

                    mClient = new MongoClient(url);
                    globalserver = mClient.GetServer();

                    MongoServer server = mClient.GetServer();

                    //Creating network connection;
                    dbMongoREAD = server.GetDatabase(database);
                    if (dbMongoREAD == null)
                    {
                        //MessageBox.Show("Snaphsot could not make a connection to server for read/write");
                        return null;
                    }
                }

                return dbMongoREAD;
            }
            catch (MongoException me)
            {
                Trace.WriteLine(me.Message);
            }

            //Could not connect to network!
            return null;
        }
    }
}