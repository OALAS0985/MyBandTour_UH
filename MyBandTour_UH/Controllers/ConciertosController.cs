using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MyBandTour_UH.Models;
using System.Globalization;

namespace MyBandTour_UH.Controllers
{
    public class ConciertosController : Controller
    {
        // GET: Conciertos
        public ActionResult Inicio()
        {
            return View();
        }
        public ActionResult Eliminar()
        {
            return View();
        }
        public ActionResult Agregar()
        {
            return View();
        }

        public ActionResult Dashboard()
        {
            if (Session["Verificado"] == null)
            {
                return RedirectToAction("Inicio");
            }
            if (Session["Verificado"].ToString() == "OK")
            {
                return View();
            }
            else
            {
                return RedirectToAction("Inicio");
            }
        }
        public ActionResult Login()
        {
            return View();
        }
        public JsonResult ValidarLogin(string usuario, string contrasena)
        {
            string usuarioBD = "oscar";
            string passBD = "12345";

           
            if (usuario.Equals(usuarioBD) && contrasena.Equals(passBD))
            {
            
                Session["Verificado"] = "OK";
                return Json(new { Estado = "Autenticado" });
            }
            else
            {
             
                return Json(new { Estado = "Fallo Autenticación" });
            }
        }

        public JsonResult Logout()
        {

            Session.Abandon();
            return Json(new { Estado = "Sesion Cerrada" });
        }


        public JsonResult ConsultarConciertos()
        {
            BD_MyBandTourEntities2 conexion = new BD_MyBandTourEntities2(); 
            var listaConciertos = conexion.pr_ConsultarConciertos();
            return Json(new { Lista = listaConciertos });
        }

        public JsonResult EliminarConciertos(string codigo)
        {
            BD_MyBandTourEntities2 conexion = new BD_MyBandTourEntities2();
            var resultado = conexion.pr_EliminarConcierto(codigo);
            return Json(new { resultado });
        }

  

        public JsonResult BuscarConciertos(string banda)
        {
            BD_MyBandTourEntities2 conexion = new BD_MyBandTourEntities2(); 
            var concierto = conexion.pr_BuscarPorNombre(banda);
            return Json(new { Lista = concierto });
        }

        




        public JsonResult InsertarConcierto(string codigo, string banda, string genero, DateTime fecha, TimeSpan hora, string pais, string direccion)
        {

            BD_MyBandTourEntities2 conexion = new BD_MyBandTourEntities2(); 
            ObjectParameter Resultado = new ObjectParameter("Resultado", typeof(int));
            
        
            conexion.pr_InsertarConcierto(codigo, banda, genero, fecha, hora, pais, direccion, Resultado);
            return Json(new { Codigo = Resultado.Value });

        }
    }
}
