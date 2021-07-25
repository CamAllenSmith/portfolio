using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio {
    public class Startup {

        public void ConfigureServices(IServiceCollection services) {
            services.AddRazorPages();
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseEndpoints(endpoints => {
                endpoints.MapRazorPages();
            });
        }
    }
}
