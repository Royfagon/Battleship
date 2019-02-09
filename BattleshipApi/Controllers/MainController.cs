using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Windows.Forms;
using System.ComponentModel;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text;
using System.Xml;
using System.Collections;
using System.IO;
using System.Security.Cryptography;
using System.Reflection;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Routing;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Diagnostics;

namespace BattleshipApi.Controllers
{
    public class MainController : ApiController
    {
        public MongoClient mClient = null;
        public MongoServer globalserver = null;
        public MongoDatabase dbMongoREAD = null;
        public MongoDatabase dbChartInfo = null;

        private BsonDocument ConvertPostData(HttpRequestMessage request)
        {
            var byteArray = request.Content.ReadAsByteArrayAsync().Result;
            var data = Encoding.UTF8.GetString(byteArray, 0, byteArray.Length);
            data = data + "}";

            BsonDocument bsd = null;
            try
            {
                bsd = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(data);
            }
            catch (Exception e)
            {
                Trace.WriteLine("ConvertPostData" + e.Message);
            }
            return bsd;
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("api/gamers")]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [System.Web.Http.HttpPost]
        public HttpResponseMessage GetListOfGamers(HttpRequestMessage request)
        {
            BsonDocument bsdx = ConvertPostData(request);

            HttpResponseMessage resp = null;
            MongoCursor<BsonDocument> gamers_list = null;

            StringBuilder sb = new StringBuilder();
            sb.AppendFormat("{{}}");

            string userid = bsdx.GetElement("userid").Value.ToString();
            string remoteid = bsdx.GetElement("remoteid").Value.ToString();

            try{
                string s_serverip = System.Configuration.ConfigurationManager.AppSettings["battleship_server"];
                string s_Database = System.Configuration.ConfigurationManager.AppSettings["battleship_db"];
                string s_collection = "gamers";

                //Remove yourself from your users list
                sb.Clear();
                sb.AppendFormat("{{ \"game_id\" : {{$ne : \"{0}\"}} }}", userid);

                GetDB db = new GetDB(s_serverip, s_Database);
                db.GetSystemDatabase(s_Database, s_collection, ref dbMongoREAD, ref s_Database, ref s_collection);

                MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>("gamers");
                BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
                QueryDocument queryDoc = new QueryDocument(queryX);
                gamers_list = gamersDoc.Find(queryDoc);

                sb.Clear();
                if (gamers_list != null)
                {
                    sb.AppendFormat("{{\"gamers\": [");
                    bool comma = false;

                    foreach (BsonDocument bsd in gamers_list)
                    {
                        bsd.RemoveAt(0);


                        //Check if user is in play for someone
                        if (!IsPlaying(dbMongoREAD, userid, bsd.GetElement("game_id").Value.ToString()))
                        {
                            if (comma)
                            {
                                comma = true;
                                sb.AppendFormat(",");
                            }
                            sb.AppendFormat("{0}", bsd.ToString());
                            comma = true;
                        }
                    }
                    sb.AppendFormat("]}}");
                }
                else
                    sb.AppendFormat("{{\"gamers\" : \"USERNOTFOUND\"}}");
            }
            catch (Exception ex)
            {
                sb.Clear();
                sb.AppendFormat("{{ \"INT_ERR_11\" : \"{0}\" }}", ex.Message);
                resp = new HttpResponseMessage { Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json") };
                return resp;
            }
            
            /*
            //Remove yourself from your users list
            if (remoteid.Length > 0)
            {
                BsonDocument queryUser = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());

                StringBuilder sbx = new StringBuilder();
                sbx.AppendFormat("{{ $or : [ {{\"user_1\" : \"{0}\", \"user_2\" : \"{1}\"}}, {{\"user_1\" : \"{1}\", \"user_2\" : \"{0}\"}} ]}}", userid, remoteid);
                MongoCollection<BsonDocument> gamerboardDoc = dbMongoREAD.GetCollection<BsonDocument>("gamerboard");
                BsonDocument query = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sbx.ToString());
                QueryDocument queryD = new QueryDocument(query);
                MongoCursor<BsonDocument> gamerboard = gamerboardDoc.Find(queryD);
                if (gamerboard != null)
                {
                    // gamers== All gamers list
                    List<BsonDocument> vNodeX = gamers_list.ToList();
                    if (vNodeX.Count > 0)
                    {
                        //remove me from the list
                        BsonArray bsa = (BsonArray)queryUser.GetElement("gamers").Value;
                        int i = 0;
                        foreach (BsonDocument bx in bsa)
                        {
                            if (bx.GetElement("game_id").Value.ToString() == remoteid)   //IN PLAY
                            {
                                bsa.RemoveAt(i);
                                break;
                            }
                            i++;
                        }

                        sb.Clear();
                        sb.AppendFormat("{{\"gamers\": [");
                        bool comma = false;
                        foreach (BsonDocument bs in bsa)
                        {
                            if (comma)
                            {
                                comma = true;
                                sb.AppendFormat(",");
                            }
                            sb.AppendFormat("{0}", bs.ToString());
                            comma = true;
                        }
                        sb.AppendFormat("]}}");

                    }
                }
            }
            else
            */
            {
                BsonDocument queryUser = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
                
                StringBuilder sbx = new StringBuilder();
                sbx.AppendFormat("{{ $or : [ {{\"user_1\" : \"{0}\"}}, {{ \"user_2\" : \"{0}\"}} ]}}", userid);
                MongoCollection<BsonDocument> gamerboardDoc = dbMongoREAD.GetCollection<BsonDocument>("gamerboard");
                BsonDocument query = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sbx.ToString());
                QueryDocument queryD = new QueryDocument(query);
                MongoCursor<BsonDocument> gamerboard = gamerboardDoc.Find(queryD);
                if (gamerboard != null)
                {
                    List<BsonDocument> vNodeX = gamers_list.ToList();
                    List<BsonDocument> vNodeY = gamerboard.ToList();

                    //remove anyone I'm playing from the list
                    BsonArray bsa = (BsonArray)queryUser.GetElement("gamers").Value;
                    int i = 0;
                    foreach (BsonDocument bx in vNodeX) //GAMERS
                    {
                        bx.RemoveAt(0);
                        foreach (BsonDocument by in vNodeY) //GAMES
                        {
                            if (by.GetElement("user_1").Value.ToString() == userid && 
                                by.GetElement("user_2").Value.ToString() == bx.GetElement("game_id").Value.ToString() ||
                                by.GetElement("user_2").Value.ToString() == userid && 
                                by.GetElement("user_1").Value.ToString() == bx.GetElement("game_id").Value.ToString())   //IN PLAY
                            {
                                BsonElement bse = new BsonElement("status", (BsonValue)"INPLAY");
                                vNodeX[i].Add(bse);
                            }
                        }

                        if (!bx.Contains("status"))
                        {
                            BsonElement bse = new BsonElement("status", (BsonValue)"AVAILABLE");
                            vNodeX[i].Add(bse);
                        }

                        i++;
                    }

                    sb.Clear();
                    sb.AppendFormat("{{\"gamers\": [");
                    bool comma = false;
                    foreach (BsonDocument bs in vNodeX)
                    {
                        if (comma)
                        {
                            comma = true;
                            sb.AppendFormat(",");
                        }
                        sb.AppendFormat("{0}", bs.ToString());
                        comma = true;
                    }
                    sb.AppendFormat("]}}");
                }
                else
                {
                    sb.Clear();
                    sb.AppendFormat("{{}}");
                }
            }

            string json = sb.ToString();
            resp = new HttpResponseMessage { Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json") };
            return resp;
        }

        private bool IsPlaying(MongoDatabase mdb, string userid, string gameid)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendFormat("{{\"game_id\" : \"{0}|{1}\"}}", userid, gameid);
            MongoCollection<BsonDocument> gamersDoc = mdb.GetCollection<BsonDocument>("gamerboard");
            BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
            QueryDocument queryDoc = new QueryDocument(queryX);
            MongoCursor<BsonDocument> gamers = gamersDoc.Find(queryDoc);

            if (gamers != null)
            {
                List<BsonDocument> user = gamers.ToList();
                if(user.Count()>0)
                    return true;
            }
            return false;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("api/validate")]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [System.Web.Http.HttpPost]
        public HttpResponseMessage GetValidation(HttpRequestMessage request)
        {
            HttpResponseMessage resp = null;

            BsonDocument bsd = ConvertPostData(request);

            ///////////////////////////////////////////////////////
            // ASSIGN THE ATTRIBUTES
            ///////////////////////////////////////////////////////
            string userid = bsd.GetElement("user").Value.ToString();
            string password = bsd.GetElement("password").Value.ToString();
            string login_type = bsd.GetElement("type").Value.ToString();

            StringBuilder sb = new StringBuilder();
            string s_serverip = System.Configuration.ConfigurationManager.AppSettings["battleship_server"];
            string s_Database = System.Configuration.ConfigurationManager.AppSettings["battleship_db"];
            string s_collection = "gamers";

            sb.AppendFormat("{{\"game_id\":\"{0}\", \"game_pswd\":\"{1}\", \"type\":\"gamers\"}}", userid, password);

            GetDB db = new GetDB(s_serverip, s_Database);
            db.GetSystemDatabase(s_Database, s_collection, ref dbMongoREAD, ref s_Database, ref s_collection);

            MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>("gamers");
            BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
            QueryDocument queryDoc = new QueryDocument(queryX);
            MongoCursor<BsonDocument> gamers = gamersDoc.Find(queryDoc);

            string json = "{\"validation\":\"" + userid + "\",\"type\":\"" + login_type + "\", \"response\":\"OK\"}";

            if (gamers.Count() > 0) //You are in the system
            {
                if (login_type == "NEW")    //You are new but using an existing name
                    json = "{\"validation\":\"" + userid + "\",\"type\":\"" + login_type + "\",\"response\":\"USEREXISTS\"}";
                else
                    json = "{\"validation\":\"" + userid + "\",\"type\":\"" + login_type + "\",\"response\":\"PRESENT\"}";
            }
            else // No record of you
            {
                //check if username exists
                sb.Clear();
                sb.AppendFormat("{{\"game_id\":\"{0}\",\"type\":\"gamers\"}}", userid);
                queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
                queryDoc = new QueryDocument(queryX);
                MongoCursor<BsonDocument> users = gamersDoc.Find(queryDoc);
                if (users.Count() > 0)  //Your name is in the system but your password isn't
                {
                    if (login_type == "NEW") // You are a new user trying aname that exists
                        json = "{\"validation\":\"" + userid + "\",\"type\":\"" + login_type + "\",\"response\":\"USEREXISTS\"}";
                    else // You are a user with a wrong password
                        json = "{\"validation\":\"" + userid + "\",\"type\":\"" + login_type + "\",\"response\":\"PSWDFAIL\"}";
                }
                else //You are not in the system so will be added
                {
                    json = "{\"game_id\":\"" + userid + "\",\"game_pswd\":\"" + password + "\",\"type\":\"gamers\"}";
                    BsonDocument bsdx = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(json);
                    gamersDoc.Insert(bsdx);
                    json = "{\"validation\":\"" + userid + "\",\"type\":\"" + login_type + "\",\"response\":\"OK\"}";
                }
            }

            ///////////////////////////////////////////
            resp = new HttpResponseMessage { Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json") };
            resp.EnsureSuccessStatusCode();
            return resp;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("api/submit")]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [System.Web.Http.HttpPost]
        public HttpResponseMessage SubmitData(HttpRequestMessage request)
        {
            HttpResponseMessage resp = null;

            BsonDocument bsd = ConvertPostData(request);

            ///////////////////////////////////////////////////////
            // ASSIGN THE ATTRIBUTES
            ///////////////////////////////////////////////////////
            string game_id = bsd.GetElement("game_id").Value.ToString();
            string [] gamersid = game_id.Split('|');
            string idd_1 = gamersid[0] + "|" + gamersid[1];
            string idd_2 = gamersid[1] + "|" + gamersid[0];

            string action = bsd.GetElement("action").Value.ToString();
            string user_local = bsd.GetElement("local_user").Value.ToString();
            string user_remote = bsd.GetElement("remote_user").Value.ToString();
            int columns = (int)bsd.GetElement("columns").Value;
            int rows = (int)bsd.GetElement("rows").Value;
            BsonArray bsdShip = (BsonArray)bsd.GetElement("ships").Value;
            BsonArray bsdHits = (BsonArray)bsd.GetElement("hits").Value;

            StringBuilder sbx = new StringBuilder();
            sbx.AppendFormat("\"ships\": [");
            int i = 0;
            foreach (BsonDocument bsa in bsdShip)
            {
                if (i > 0)
                    sbx.AppendFormat(",");
                sbx.AppendFormat("{0}", bsa.ToString());
                i++;
            }
            sbx.AppendFormat("]");

            StringBuilder sbk = new StringBuilder();
            sbk.AppendFormat("\"hits\": [");
            int ii = 0;
            foreach (BsonDocument bsa in bsdHits)
            {
                if (ii > 0)
                    sbk.AppendFormat(",");
                sbk.AppendFormat("{0}", bsa.ToString());
                ii++;
            }
            sbk.AppendFormat("]");

            StringBuilder sb = new StringBuilder();

            try
            {
                string s_serverip = System.Configuration.ConfigurationManager.AppSettings["battleship_server"];
                string s_Database = System.Configuration.ConfigurationManager.AppSettings["battleship_db"];
                string s_collection = "gamerboard";

                sb.AppendFormat("{{\"server\":\"{0}\", \"database\":\"{1}\",\"user_1\":\"{2}\",\"user_2\":\"{3}\",\"action\":\"{4}\" }}", s_serverip, s_Database, user_local, user_remote, action);

                GetDB db = new GetDB(s_serverip, s_Database);
                db.GetSystemDatabase(s_Database, s_collection, ref dbMongoREAD, ref s_Database, ref s_collection);

                MongoCollection<BsonDocument> gamers = dbMongoREAD.GetCollection<BsonDocument>("gamerboard");
                BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
                QueryDocument queryDoc = new QueryDocument(queryX);
                MongoCursor<BsonDocument> views = gamers.Find(queryDoc);

                if (views.Count() == 0)
                {
                    sb.Clear();
                    sb.AppendFormat("{{\"game_id\":\"{0}\", \"next_player\" : \"{1}\", \"user_1\":\"{2}\",\"user_2\":\"{3}\", \"issuer\": \"{4}\",\"action\":\"{5}\", {6}, {7},\"ships_remote\": [], \"hits_remote\": [], \"winner\":\"@@@@\", \"ship_down_for\":\"@@@@\"}}", idd_1, user_remote, user_local, user_remote, user_local, action, sbx.ToString(), sbk.ToString());
                    BsonDocument bsdx = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
                    gamers.Insert(bsdx);
                }
            }
            catch (Exception ex)
            {
                sb.Clear();
                sb.AppendFormat("{{ \"INT_ERR_0\" : \"{0}\" }}", ex.Message);
                resp = new HttpResponseMessage { Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json") };
                return resp;
            }

            ///////////////////////////////////////////
            string json = sb.ToString();
            resp = new HttpResponseMessage { Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json") };
            resp.EnsureSuccessStatusCode();
            return resp;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("api/startgame")]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [System.Web.Http.HttpPost]
        public HttpResponseMessage StartGame(HttpRequestMessage request)
        {
            string json = "[{\"Battleship\":\"StartGame\"}]";

            HttpResponseMessage resp = null;

            BsonDocument bsd = ConvertPostData(request);

            StringBuilder sb = new StringBuilder();

            try
            {
                ///////////////////////////////////////////////////////
                // ASSIGN THE ATTRIBUTES
                ///////////////////////////////////////////////////////
                string user_1 = bsd.GetElement("user1").Value.ToString();
                string user_2 = bsd.GetElement("user2").Value.ToString();

                
                string s_serverip = System.Configuration.ConfigurationManager.AppSettings["battleship_server"];
                string s_Database = System.Configuration.ConfigurationManager.AppSettings["battleship_db"];
                string s_collection = "gamerboard";

                sb.AppendFormat("{{ \"game_id\" : \"{0}|{1}\", \"action\" : \"REQ\" }}", user_1, user_2);

                GetDB db = new GetDB(s_serverip, s_Database);
                db.GetSystemDatabase(s_Database, s_collection, ref dbMongoREAD, ref s_Database, ref s_collection);

                MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>(s_collection);
                BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
                QueryDocument queryDoc = new QueryDocument(queryX);

                StringBuilder sbQueryX = new StringBuilder();
                sbQueryX.AppendFormat("{{ $set: {{ action : \"PLAY\", \"next_player\" : \"{0}\" }} }}", user_2);

                MongoUpdateOptions muo = new MongoUpdateOptions();
                muo.Flags = UpdateFlags.Multi;
                BsonDocument queryx = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sbQueryX.ToString());
                UpdateDocument updateDoc = new UpdateDocument(queryx);
                gamersDoc.Update(queryDoc, updateDoc, muo);

                json = bsd.ToString();
            }
            catch (Exception ex)
            {
                sb.Clear();
                sb.AppendFormat("{{ \"INT_ERR_4\" : \"{0}\" }}", ex.Message);
                resp = new HttpResponseMessage { Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json") };
                return resp;
            }
            resp = new HttpResponseMessage { Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json") };

            return resp;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        [Route("api/action")]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [System.Web.Http.HttpPost]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        public HttpResponseMessage GetAction( HttpRequestMessage request)
        {
            HttpResponseMessage resp = null;

            BsonDocument bsd = ConvertPostData(request);

            ///////////////////////////////////////////////////////
            // ASSIGN THE ATTRIBUTES
            ///////////////////////////////////////////////////////
            string user_1 = bsd.GetElement("user1").Value.ToString();
            string user_2 = bsd.GetElement("user2").Value.ToString();
            string command = bsd.GetElement("command").Value.ToString();
            
         
            // CONNECTION ///////////////////////////////////////////////////////////////////////////////////////////////////
            string s_serverip = System.Configuration.ConfigurationManager.AppSettings["battleship_server"];
            string s_Database = System.Configuration.ConfigurationManager.AppSettings["battleship_db"];
            string s_collection = "gamerboard";
            GetDB db = new GetDB(s_serverip, s_Database);
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            StringBuilder sb = new StringBuilder();
            StringBuilder json = new StringBuilder();

            sb.AppendFormat("{{}}");
            json.AppendFormat("{{ \"action\" : \"{0}\", \"user_1\" : \"{1}\", \"user_2\" : \"{2}\" }}", command, user_1, user_2);
            
            
            db.GetSystemDatabase(s_Database, s_collection, ref dbMongoREAD, ref s_Database, ref s_collection);

            if (command == "ISPLAYING")
            {
                sb.Clear();
                sb.AppendFormat("{{ $or: [{{ \"game_id\" : \"{0}|{1}\", \"action\" : \"WAIT\" }}, {{ \"game_id\" : \"{0}|{1}\", \"action\" : \"PLAY\" }}, {{ \"game_id\" : \"{1}|{0}\", \"action\" : \"WAIT\" }}, {{ \"game_id\" : \"{1}|{0}\", \"action\" : \"PLAY\" }} ] }}", user_1, user_2);
                
                try
                {
                    MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>(s_collection);
                    BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
                    QueryDocument queryDoc = new QueryDocument(queryX);
                    MongoCursor<BsonDocument> datax = gamersDoc.Find(queryDoc);

                    if (datax != null)
                    {
                        List<BsonDocument> bsdShip = datax.ToList();

                        StringBuilder sbx = new StringBuilder();
                        if (bsdShip.Count() > 0)
                            sbx.AppendFormat("\"details\": ");
                        int i = 0;
                        foreach (BsonDocument bsa in bsdShip)
                        {
                            bsa.RemoveAt(0);
                            if (i > 0)
                                sbx.AppendFormat(",");
                            sbx.AppendFormat("{0}", bsa.ToString());
                            i++;
                        }

                        json.Clear();
                        if (datax.Count() == 0)
                            json.AppendFormat("{{ \"action\" : \"{0}\", \"response\" : \"NO\"}}", command);
                        else
                            json.AppendFormat("{{ \"action\" : \"{0}\", \"response\" : \"YES\", {1}  }}", command, sbx.ToString());
                    }
                }
                catch (Exception ex)
                {
                    sb.Clear();
                    sb.AppendFormat("{{ \"INT_ERR_1\" : \"{0}\" }}", ex.Message);
                    resp = new HttpResponseMessage { Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json") };
                    return resp;
                }
            }
            
            if (command == "UPDATEGAMEBOARD")
            {
                sb.Clear();
                sb.AppendFormat("{{ $or: [{{\"game_id\" : \"{0}|{1}\", \"action\" : \"PLAY\" }}, {{\"game_id\" : \"{1}|{0}\", \"action\" : \"PLAY\" }} ] }}", user_1, user_2);
                try
                {
                    MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>(s_collection);
                    BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
                    QueryDocument queryDoc = new QueryDocument(queryX);
                    MongoCursor<BsonDocument> game = gamersDoc.Find(queryDoc);
                    List<BsonDocument> v_game = game.ToList();
                   
                    BsonArray ships = (BsonArray)bsd.GetElement("ships").Value;
                    BsonArray hits = (BsonArray)bsd.GetElement("hits").Value;

                    string issuer = v_game[0].GetElement("issuer").Value.ToString();

                    StringBuilder sbQueryX = new StringBuilder();

                    if(user_1 == issuer)
                        sbQueryX.AppendFormat("{{ $set: {{ ships : {0},  hits : {1} }} }}", ships, hits);
                    else
                        sbQueryX.AppendFormat("{{ $set: {{ ships_remote : {0},  hits_remote : {1} }} }}", ships, hits);

                    MongoUpdateOptions muo = new MongoUpdateOptions();
                    muo.Flags = UpdateFlags.Multi;
                    BsonDocument queryx = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sbQueryX.ToString());
                    UpdateDocument updateDoc = new UpdateDocument(queryx);
                    gamersDoc.Update(queryDoc, updateDoc, muo);
                    game = gamersDoc.Find(queryDoc);
                    v_game = game.ToList();
                    v_game[0].RemoveAt(0);

                    resp = new HttpResponseMessage { Content = new StringContent( v_game[0].ToString(), System.Text.Encoding.UTF8, "application/json") };
                    return resp;
                }
                catch (Exception ex)
                {
                    sb.Clear();
                    sb.AppendFormat("{{ \"INT_ERR_2\" : \"{0}\" }}", ex.Message);
                    resp = new HttpResponseMessage { Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json") };
                    return resp;
                }

            }

            if (command == "FETCHGAMEBOARD")
            {
                try{
                    sb.Clear();
                    sb.AppendFormat("{{ $or: [{{ \"game_id\" : \"{0}|{1}\", \"action\" : \"WAIT\" }}, {{ \"game_id\" : \"{0}|{1}\", \"action\" : \"PLAY\" }}, {{ \"game_id\" : \"{1}|{0}\", \"action\" : \"WAIT\" }}, {{ \"game_id\" : \"{1}|{0}\", \"action\" : \"PLAY\" }}] }}", user_1, user_2);
                    MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>(s_collection);
                    BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
                    QueryDocument queryDoc = new QueryDocument(queryX);
                    MongoCursor<BsonDocument> datax = gamersDoc.Find(queryDoc);

                    if (datax != null)
                    {
                        List<BsonDocument> gameboard = datax.ToList();
                        if (gameboard.Count() > 0)
                        {
                            gameboard[0].RemoveAt(0);
                            
                            //Add the action element to the bson
                            BsonElement bse = new BsonElement("action", (BsonValue)"FETCHGAMEBOARD");
                            gameboard[0].Add(bse);

                            resp = new HttpResponseMessage { Content = new StringContent(gameboard[0].ToString(), System.Text.Encoding.UTF8, "application/json") };
                            return resp;
                        }
                        else
                        {   //Handles the local who made request selecting a remote
                            sb.Clear();
                            sb.AppendFormat("{{ $or: [{{ \"game_id\" : \"{0}|{1}\", \"action\" : \"REQ\" }}, {{ \"game_id\" : \"{1}|{0}\", \"action\" : \"REQ\" }}] }}", user_1, user_2);
                            gamersDoc = dbMongoREAD.GetCollection<BsonDocument>(s_collection);
                            queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
                            queryDoc = new QueryDocument(queryX);
                            datax = gamersDoc.Find(queryDoc);

                            if (datax != null)
                            {
                                gameboard = datax.ToList();
                                if (gameboard.Count() > 0)
                                {
                                    gameboard[0].RemoveAt(0);
                                    BsonElement bse = new BsonElement("action", (BsonValue)"FETCHGAMEBOARD");
                                    gameboard[0].Add(bse);
                                    resp = new HttpResponseMessage { Content = new StringContent(gameboard[0].ToString(), System.Text.Encoding.UTF8, "application/json") };
                                    return resp;
                                }
                            }

                        }
                    }
                }
                catch (Exception ex)
                {
                    sb.Clear();
                    sb.AppendFormat("{{ \"INT_ERR_3\" : \"{0}\" }}", ex.Message);
                    resp = new HttpResponseMessage { Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json") };
                    return resp;
                }
            }

            if (command == "GETREMOTEGAMEBOARD")
            {
                try{
                    sb.Clear();
                    sb.AppendFormat("{{ $or: [{{ \"game_id\" : \"{0}|{1}\", \"action\" : \"WAIT\" }}, {{ \"game_id\" : \"{0}|{1}\", \"action\" : \"PLAY\" }}, {{ \"game_id\" : \"{1}|{0}\", \"action\" : \"WAIT\" }}, {{ \"game_id\" : \"{1}|{0}\", \"action\" : \"PLAY\" }}] }}", user_2, user_1);
                    MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>(s_collection);
                    BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
                    QueryDocument queryDoc = new QueryDocument(queryX);
                    MongoCursor<BsonDocument> datax = gamersDoc.Find(queryDoc);

                    if (datax != null)
                    {
                        List<BsonDocument> gameboard = datax.ToList();
                        if (gameboard.Count() > 0)
                        {
                            gameboard[0].RemoveAt(0);

                            //Add the action element to the bson
                            BsonElement bse = new BsonElement("command", (BsonValue)"GETREMOTEGAMEBOARD");
                            gameboard[0].Add(bse);

                            resp = new HttpResponseMessage { Content = new StringContent(gameboard[0].ToString(), System.Text.Encoding.UTF8, "application/json") };
                            return resp;
                        }
                    }
                }
                catch (Exception ex)
                {
                    sb.Clear();
                    sb.AppendFormat("{{ \"INT_ERR_6\" : \"{0}\" }}", ex.Message);
                    resp = new HttpResponseMessage { Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json") };
                    return resp;
                }

            }

            if (command == "ENDGAME")
            {
                try{
                    sb.Clear();
                    sb.AppendFormat("{{ $or : [ {{\"game_id\":\"{0}|{1}\"}}, {{\"game_id\":\"{1}|{0}\"}} ] }}", user_1, user_2);
                    MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>(s_collection);
                    BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
                    QueryDocument queryDoc = new QueryDocument(queryX);
                    gamersDoc.Remove(queryDoc);
                }
                catch (Exception ex)
                {
                    sb.Clear();
                    sb.AppendFormat("{{ \"INT_ERR_8\" : \"{0}\" }}", ex.Message);
                    resp = new HttpResponseMessage { Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json") };
                    return resp;
                }
            }

            resp = new HttpResponseMessage { Content = new StringContent(json.ToString(), System.Text.Encoding.UTF8, "application/json") };
            return resp;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("api/hitlist")]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [System.Web.Http.HttpPost]
        //public HttpResponseMessage GetStatus(string companyid, string surveyid, string waveid)
        public HttpResponseMessage UpdateHitlist(HttpRequestMessage request)
        {
            BsonDocument bsd = ConvertPostData(request);

            HttpResponseMessage resp = null;

            StringBuilder sb = new StringBuilder();

            try{
                ///////////////////////////////////////////////////////
                // ASSIGN THE ATTRIBUTES
                ///////////////////////////////////////////////////////
                string user_1 = bsd.GetElement("user1").Value.ToString();
                string user_2 = bsd.GetElement("user2").Value.ToString();
                string command = bsd.GetElement("command").Value.ToString();
                
                string s_serverip = System.Configuration.ConfigurationManager.AppSettings["battleship_server"];
                string s_Database = System.Configuration.ConfigurationManager.AppSettings["battleship_db"];
                string s_collection = "gamerboard";

                //locate my game
                sb.AppendFormat("{{ $or : [ {{\"game_id\":\"{0}|{1}\"}}, {{\"game_id\":\"{1}|{0}\"}} ] }}", user_1, user_2);

                GetDB db = new GetDB(s_serverip, s_Database);
                db.GetSystemDatabase(s_Database, s_collection, ref dbMongoREAD, ref s_Database, ref s_collection);

                MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>(s_collection);
                BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
                QueryDocument queryDoc = new QueryDocument(queryX);
                MongoCursor<BsonDocument> gamers = gamersDoc.Find(queryDoc);
                List<BsonDocument> game = gamers.ToList();

                
                //Retrieve your hitlist
                BsonArray bsa = null;
                BsonArray bsaMiss = null;
                
                string cell = bsd.GetElement("cell").Value.ToString();  //My bomb

                bool bISSUER = false;

                //Am I the issuer?
                if (game[0].GetElement("issuer").Value.ToString() == user_1)    //ISSUER
                {//Then see if I hit anything on the remote board
                    bISSUER = true;
                    bsa = (BsonArray)game[0].GetElement("ships_remote").Value;
                    bsaMiss = (BsonArray)game[0].GetElement("hits_remote").Value;
                }
                else
                {//Then lets see if I hit anything on the issuers board
                    bsa = (BsonArray)game[0].GetElement("ships").Value;
                    bsaMiss = (BsonArray)game[0].GetElement("hits").Value;
                }

                int i = 0;
                bool bHit = false;
                foreach (BsonDocument bsdShips in bsa)
                {
                    if (bsdShips.GetElement("cell").Value.ToString() == cell)
                    {
                        BsonElement bse = new BsonElement("hit", (BsonValue)"Y");
                        ((BsonDocument)bsa[i]).SetElement(bse);
                        bHit = true;
                    }
                    i++;
                }

                if (!bHit)
                {
                    BsonDocument newBSD = new BsonDocument
                    {
                        {"cell" , cell}
                    };

                    bsaMiss.Add(newBSD);
                }


                
                StringBuilder sbQueryX = new StringBuilder();
                if (game[0].GetElement("action").Value.ToString() == "PLAY")
                {
                    if (bISSUER)
                        sbQueryX.AppendFormat("{{ $set: {{ ships_remote : {0}, action : \"WAIT\", \"next_player\" : \"{1}\", hits_remote : {2} }} }}", bsa, user_2, bsaMiss);
                    else
                        sbQueryX.AppendFormat("{{ $set: {{ ships : {0}, action : \"WAIT\", \"next_player\" : \"{1}\", hits : {2} }} }}", bsa, user_2, bsaMiss);
                }
                else
                {
                    if (bISSUER)
                        sbQueryX.AppendFormat("{{ $set: {{ ships_remote : {0}, action : \"PLAY\", \"next_player\" : \"{1}\", hits_remote : {2} }} }}", bsa, user_2, bsaMiss);
                    else
                        sbQueryX.AppendFormat("{{ $set: {{ ships : {0}, action : \"PLAY\", \"next_player\" : \"{1}\", hits : {2}   }} }}", bsa, user_2, bsaMiss);
                }

                MongoUpdateOptions muo = new MongoUpdateOptions();
                muo.Flags = UpdateFlags.Multi;
                BsonDocument queryx = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sbQueryX.ToString());
                UpdateDocument updateDoc = new UpdateDocument(queryx);
                gamersDoc.Update(queryDoc, updateDoc, muo);

                gamers = gamersDoc.Find(queryDoc);
                if (gamers != null)
                {
                    List<BsonDocument> gameboard = gamers.ToList();
                    if (gameboard.Count() > 0)
                    {
                        gameboard[0].RemoveAt(0);
                        resp = new HttpResponseMessage { Content = new StringContent(gameboard[0].ToString(), System.Text.Encoding.UTF8, "application/json") };
                        return resp;
                    }
                }
                
            }
            catch (Exception ex)
            {
                sb.Clear();
                sb.AppendFormat("{{ \"INT_ERR_9\" : \"{0}\" }}", ex.Message);
                resp = new HttpResponseMessage { Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json") };
                return resp;
            }
            
            resp = new HttpResponseMessage { Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json") };
            return resp;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("api/getuserinfo")]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [System.Web.Http.HttpPost]
        //public HttpResponseMessage GetStatus(string companyid, string surveyid, string waveid)
        public HttpResponseMessage getuserinfo(HttpRequestMessage request)
        {
            return GetStatus(request);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private int CountHits(BsonArray bsArray)
        {
            int total = 0;

            foreach (BsonDocument bsa in bsArray)
            {
                //if (bsa.GetElement("hit").Value.ToString() == "H")
                //    total++;
            }
            
            return total;
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("api/status")]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [System.Web.Http.HttpPost]
        //public HttpResponseMessage GetStatus(string companyid, string surveyid, string waveid)
        public HttpResponseMessage GetStatus(HttpRequestMessage request)
        {
            BsonDocument bsd = ConvertPostData(request);

            string userid = bsd.GetElement("user_id").Value.ToString();
            string gameid = bsd.GetElement("game_id").Value.ToString();

            StringBuilder sb = new StringBuilder();
            string s_serverip = System.Configuration.ConfigurationManager.AppSettings["battleship_server"];
            string s_Database = System.Configuration.ConfigurationManager.AppSettings["battleship_db"];
            string s_collection = "gamerboard";

            if (bsd.GetElement("type").Value.ToString() == "info")
                sb.AppendFormat("{{\"game_id\":\"{0}\"}}", gameid);
            else
                sb.AppendFormat("{{ $or : [ {{\"user_1\":\"{0}\"}}, {{\"user_2\":\"{0}\"}} ] }}", userid);

            GetDB db = new GetDB(s_serverip, s_Database);
            db.GetSystemDatabase(s_Database, s_collection, ref dbMongoREAD, ref s_Database, ref s_collection);

            MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>(s_collection);
            BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
            QueryDocument queryDoc = new QueryDocument(queryX);
            MongoCursor<BsonDocument> gamers = gamersDoc.Find(queryDoc);

            //Winner detect
            string winner = "@@@@";

            StringBuilder sbx = new StringBuilder();

            sbx.AppendFormat("{{\"requests\": [");
            int i = 0, b = 0, s = 0;
            foreach (BsonDocument bsdx in gamers)
            {
                bsdx.RemoveAt(0);
                string issuer = bsdx.GetElement("issuer").Value.ToString();
                if (userid == issuer)
                {
                    BsonArray arr = (BsonArray)bsdx.GetElement("hits_remote").Value;
                    BsonArray shp = (BsonArray)bsdx.GetElement("ships_remote").Value;
                    int q = CountHits(arr);
                    b = q;
                    s = shp.Count();
                    if (q == shp.Count() && q != 0)
                    {
                        winner = userid;
                    }
                }
                else
                {
                    BsonArray arr = (BsonArray)bsdx.GetElement("hits").Value;
                    BsonArray shp = (BsonArray)bsdx.GetElement("ships").Value;
                    int q = CountHits(arr);
                    b = q;
                    s = shp.Count();
                    if (q == shp.Count() && q != 0)
                    {
                        winner = userid;
                    }
                }

                if (i > 0)
                    sbx.AppendFormat(",");

                sbx.AppendFormat("{0}", bsdx.ToString());
                i++;
            }
            sbx.AppendFormat("]}}");
            
            if (winner != "@@@@")   //WINNER FOUND
            {
                StringBuilder sbQueryX = new StringBuilder();
                sbQueryX.AppendFormat("{{ $set: {{ winner : \"{0}\" }} }}", userid);
                MongoUpdateOptions muo = new MongoUpdateOptions();
                muo.Flags = UpdateFlags.Multi;
                BsonDocument queryx = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sbQueryX.ToString());
                UpdateDocument updateDoc = new UpdateDocument(queryx);
                gamersDoc.Update(queryDoc, updateDoc, muo);
            }
            
            var resp = new HttpResponseMessage { Content = new StringContent(sbx.ToString(), System.Text.Encoding.UTF8, "application/json") };
            return resp;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("api/battleshipdown")]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [System.Web.Http.HttpPost]
        public HttpResponseMessage BattleshipDown(HttpRequestMessage request)
        {
            HttpResponseMessage resp = null;

            BsonDocument bsd = ConvertPostData(request);

            ///////////////////////////////////////////////////////
            // ASSIGN THE ATTRIBUTES
            ///////////////////////////////////////////////////////
            string user1 = bsd.GetElement("user_1").Value.ToString();
            string user2 = bsd.GetElement("user_2").Value.ToString();
            string down  = bsd.GetElement("user_down").Value.ToString();

            StringBuilder sb = new StringBuilder();
            string s_serverip = System.Configuration.ConfigurationManager.AppSettings["battleship_server"];
            string s_Database = System.Configuration.ConfigurationManager.AppSettings["battleship_db"];
            string s_collection = "gameboard";

            sb.AppendFormat("{{\"game_id\":\"{0}|{1}\"}}", user1, user2);

            GetDB db = new GetDB(s_serverip, s_Database);
            db.GetSystemDatabase(s_Database, s_collection, ref dbMongoREAD, ref s_Database, ref s_collection);

            MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>("gamerboard");
            BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
            QueryDocument queryDoc = new QueryDocument(queryX);
            MongoCursor<BsonDocument> gamers = gamersDoc.Find(queryDoc);

            StringBuilder sbx = new StringBuilder();
            sbx.AppendFormat("{{}}");
            if (gamers != null)
            {
                List<BsonDocument> gameboard = gamers.ToList();
                if (gameboard.Count() > 0)
                {
                    StringBuilder sbQueryX = new StringBuilder();
                    sbQueryX.AppendFormat("{{ $set: {{ ship_down_for : \"{0}\" }} }}", down);
                    MongoUpdateOptions muo = new MongoUpdateOptions();
                    muo.Flags = UpdateFlags.Multi;
                    BsonDocument queryx = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sbQueryX.ToString());
                    UpdateDocument updateDoc = new UpdateDocument(queryx);
                    gamersDoc.Update(queryDoc, updateDoc, muo);
                }

            }

            resp = new HttpResponseMessage { Content = new StringContent(sbx.ToString(), System.Text.Encoding.UTF8, "application/json") };
            resp.EnsureSuccessStatusCode();
            return resp;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("api/playagain")]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [System.Web.Http.HttpPost]
        public HttpResponseMessage PlayAgain(HttpRequestMessage request)
        {
            return BattleshipDown(request);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("api/deepsixit")]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [System.Web.Http.HttpPost]
        public HttpResponseMessage DeepSixIt(HttpRequestMessage request)
        {
            HttpResponseMessage resp = null;

            BsonDocument bsd = ConvertPostData(request);

            ///////////////////////////////////////////////////////
            // ASSIGN THE ATTRIBUTES
            ///////////////////////////////////////////////////////
            string gameid = bsd.GetElement("game_id").Value.ToString();
            string ship_array = bsd.GetElement("ship_array").Value.ToString();
            BsonArray bsa = (BsonArray)bsd.GetElement("remove").Value;

            StringBuilder sb = new StringBuilder();
            string s_serverip = System.Configuration.ConfigurationManager.AppSettings["battleship_server"];
            string s_Database = System.Configuration.ConfigurationManager.AppSettings["battleship_db"];
            string s_collection = "gameboard";

            sb.AppendFormat("{{\"game_id\":\"{0}\"}}", gameid);

            GetDB db = new GetDB(s_serverip, s_Database);
            db.GetSystemDatabase(s_Database, s_collection, ref dbMongoREAD, ref s_Database, ref s_collection);

            MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>("gamerboard");
            BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
            QueryDocument queryDoc = new QueryDocument(queryX);
            MongoCursor<BsonDocument> gamers = gamersDoc.Find(queryDoc);

            StringBuilder sbx = new StringBuilder();
            sbx.AppendFormat("{{}}");
            if (gamers != null)
            {
                List<BsonDocument> gameboard = gamers.ToList();
                if (gameboard.Count() > 0)
                {
                    

                    BsonArray bsaShip = (BsonArray)gameboard[0].GetElement(ship_array).Value;
                    List<BsonValue> vNodeX = bsaShip.ToList();
                    vNodeX.Reverse();
                    foreach (BsonValue bsv in bsa)
                    {
                        int q = vNodeX.Count()-1;
                        foreach (BsonDocument bs in vNodeX)
                        {
                            if (bs.GetElement("cell").Value.ToString() == bsv.ToString())
                            {
                                string str = bs.GetElement("img").Value.ToString();
                                string pth = Path.GetFileName(str);
                                string img = str.Replace(pth, "bs_sea.png");
                                bs.Set(1, (BsonValue)"1");
                                bs.Set(2, (BsonValue)img);
                            }
                            q--;
                        }
                    }
                    sbx.Clear();
                    sbx.AppendFormat("{{\"remaining\": [");

                    BsonArray bsax = new BsonArray();
                    int i = 0;
                    foreach (BsonDocument bs in vNodeX)
                    {
                        if (i > 0)
                            sbx.AppendFormat(",");
                        sbx.AppendFormat("{0}", bs.ToString());
                        i++;
                        bsax.Add(bs);
                    }
                    sbx.AppendFormat("]}}");

                    StringBuilder sbQueryX = new StringBuilder();
                    if(ship_array=="ships_remote")
                        sbQueryX.AppendFormat("{{ $set: {{ ships_remote : {0} }} }}", bsax);
                    else
                        sbQueryX.AppendFormat("{{ $set: {{ ships : {0} }} }}", bsax);

                    MongoUpdateOptions muo = new MongoUpdateOptions();
                    muo.Flags = UpdateFlags.Multi;
                    BsonDocument queryx = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sbQueryX.ToString());
                    UpdateDocument updateDoc = new UpdateDocument(queryx);
                    gamersDoc.Update(queryDoc, updateDoc, muo);

                }
            }

            resp = new HttpResponseMessage { Content = new StringContent(sbx.ToString(), System.Text.Encoding.UTF8, "application/json") };
            resp.EnsureSuccessStatusCode();
            return resp;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("api/restartgame")]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [System.Web.Http.HttpPost]
        public HttpResponseMessage RestartGame(HttpRequestMessage request)
        {
            HttpResponseMessage resp = null;

            BsonDocument bsd = ConvertPostData(request);

            ///////////////////////////////////////////////////////
            // ASSIGN THE ATTRIBUTES
            ///////////////////////////////////////////////////////
            string gameid = bsd.GetElement("game_id").Value.ToString();
            string userid = bsd.GetElement("user").Value.ToString();
            BsonArray ships_remote = (BsonArray)bsd.GetElement("ships_remote").Value;
            BsonArray ships = (BsonArray)bsd.GetElement("ships").Value;

            StringBuilder sb = new StringBuilder();
            string s_serverip = System.Configuration.ConfigurationManager.AppSettings["battleship_server"];
            string s_Database = System.Configuration.ConfigurationManager.AppSettings["battleship_db"];
            string s_collection = "gameboard";

            sb.AppendFormat("{{\"game_id\":\"{0}\"}}", gameid);

            GetDB db = new GetDB(s_serverip, s_Database);
            db.GetSystemDatabase(s_Database, s_collection, ref dbMongoREAD, ref s_Database, ref s_collection);

            MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>("gamerboard");
            BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
            QueryDocument queryDoc = new QueryDocument(queryX);
            MongoCursor<BsonDocument> gamers = gamersDoc.Find(queryDoc);

            StringBuilder sbx = new StringBuilder();
            sbx.AppendFormat("{{}}");
            if (gamers != null)
            {
                StringBuilder sbQueryX = new StringBuilder();
                sbQueryX.AppendFormat("{{ $set: {{ ships : {0}, hits : [], ships_remote : {1},  hits_remote : [], ship_down_for : \"@@CLEARBOARD@@\"}} }}", ships, ships_remote);
                MongoUpdateOptions muo = new MongoUpdateOptions();
                muo.Flags = UpdateFlags.Multi;
                BsonDocument queryx = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sbQueryX.ToString());
                UpdateDocument updateDoc = new UpdateDocument(queryx);
                gamersDoc.Update(queryDoc, updateDoc, muo);
                
            }

            resp = new HttpResponseMessage { Content = new StringContent(bsd.ToString(), System.Text.Encoding.UTF8, "application/json") };
            resp.EnsureSuccessStatusCode();
            return resp;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("api/updatefield")]
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [System.Web.Http.HttpPost]
        public HttpResponseMessage UpdateField(HttpRequestMessage request)
        {
            HttpResponseMessage resp = null;

            BsonDocument bsd = ConvertPostData(request);

            ///////////////////////////////////////////////////////
            // ASSIGN THE ATTRIBUTES
            ///////////////////////////////////////////////////////
            string value_type = bsd.GetElement("value_type").Value.ToString();
            string gameid = bsd.GetElement("game_id").Value.ToString();
            string field = bsd.GetElement("field").Value.ToString();
            var value = bsd.GetElement("value").Value;

            StringBuilder sb = new StringBuilder();
            string s_serverip = System.Configuration.ConfigurationManager.AppSettings["battleship_server"];
            string s_Database = System.Configuration.ConfigurationManager.AppSettings["battleship_db"];
            string s_collection = "gameboard";

            sb.AppendFormat("{{\"game_id\":\"{0}\"}}", gameid);

            GetDB db = new GetDB(s_serverip, s_Database);
            db.GetSystemDatabase(s_Database, s_collection, ref dbMongoREAD, ref s_Database, ref s_collection);

            MongoCollection<BsonDocument> gamersDoc = dbMongoREAD.GetCollection<BsonDocument>("gamerboard");
            BsonDocument queryX = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sb.ToString());
            QueryDocument queryDoc = new QueryDocument(queryX);
            MongoCursor<BsonDocument> gamers = gamersDoc.Find(queryDoc);

            StringBuilder sbx = new StringBuilder();
            sbx.AppendFormat("{{}}");
            if (gamers != null)
            {
                StringBuilder sbQueryX = new StringBuilder();
                if(value_type == "string")sbQueryX.AppendFormat("{{ $set: {{ \"{0}\" : \"{1}\" }} }}", field, (string)value);
                if (value_type == "int") sbQueryX.AppendFormat("{{ $set: {{ \"{0}\" : {1} }} }}", field, (int)value);
                if (value_type == "bool") sbQueryX.AppendFormat("{{ $set: {{ \"{0}\" : {1} }} }}", field, (bool)value);

                MongoUpdateOptions muo = new MongoUpdateOptions();
                muo.Flags = UpdateFlags.Multi;
                BsonDocument queryx = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(sbQueryX.ToString());
                UpdateDocument updateDoc = new UpdateDocument(queryx);
                gamersDoc.Update(queryDoc, updateDoc, muo);
            }

            resp = new HttpResponseMessage { Content = new StringContent(bsd.ToString(), System.Text.Encoding.UTF8, "application/json") };
            resp.EnsureSuccessStatusCode();
            return resp;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    }
}
