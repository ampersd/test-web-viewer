using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using test_web_viewer.Models;

namespace test_web_viewer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetDirectoriesTreeController : ControllerBase
    {
        
        [HttpGet]
        public Dictionary<string, JsonDirectory> Get()
        {
            var root = new Dictionary<string, JsonDirectory>();
            try
            {
                // Set a variable to the My Documents path.
                var img = getDirectoryWithChildren(Constants.rootDocPath);
                root = img.Children;
            }
            catch (UnauthorizedAccessException ex)
            {
                Console.WriteLine(ex.Message);
            }
            catch (PathTooLongException ex)
            {
                Console.WriteLine(ex.Message);
            }
            return root;
        }

        /// <summary>
        /// Recursive function
        /// </summary>
        /// <param name="docPath"></param>
        /// <returns></returns>
        public JsonDirectory getDirectoryWithChildren(string docPath) {
            var children = new Dictionary<string, JsonDirectory>();
            try
            {
                List<string> dirs = new List<string>(Directory.EnumerateDirectories(docPath));

                foreach (var dir in dirs)
                {
                    var directoryName = dir.Substring(dir.LastIndexOf(Path.DirectorySeparatorChar) + 1);
                    Console.WriteLine($"{directoryName}");

                    var child = getDirectoryWithChildren(dir);
                    children.Add(directoryName, child);
                }
                Console.WriteLine($"{dirs.Count} directories found.");
            }
            catch (UnauthorizedAccessException ex)
            {
                Console.WriteLine(ex.Message);
            }
            catch (PathTooLongException ex)
            {
                Console.WriteLine(ex.Message);
            }
            var directory = new JsonDirectory
            {
                Path = docPath.Replace(Constants.rootDocPath + "\\", ""),
                Children = children
            };
            return directory;
        }
    }
}