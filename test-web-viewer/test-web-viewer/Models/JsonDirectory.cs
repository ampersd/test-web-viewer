using System;
using System.Collections.Generic;

using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace test_web_viewer.Models
{
    public partial class JsonDirectory
    {
        [JsonProperty("path")]
        public string Path { get; set; }

        [JsonProperty("children")]
        public Dictionary<string, JsonDirectory> Children { get; set; }
    }

    public partial class JsonDirectory
    {
        public static JsonDirectory FromJson(string json) => JsonConvert.DeserializeObject<JsonDirectory>(json, test_web_viewer.Models.Converter.Settings);
    }

    public static class Serialize
    {
        public static string ToJson(this JsonDirectory self) => JsonConvert.SerializeObject(self, test_web_viewer.Models.Converter.Settings);
    }

    internal static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }
}