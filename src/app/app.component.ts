import { Component } from '@angular/core';
import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'read-xml-angular8';

  public xmlNumber: any;
  
  public xmlItems: any;

  constructor(private _http: HttpClient) { this.loadXML(); }

  loadXML() {
    // Change the file's name here.
    this._http.get('/assets/35191148595219000107550020000118331880067064.xml',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        this.parseXML(data)
          .then((data) => {
            this.xmlItems = data;
          });
      });
  }

  parseXML(data) {
    return new Promise(resolve => {
      var k: string | number,
        arr = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err, result) {
        console.log('Objeto gerado do xml:', result);
        var obj = result.nfeProc.NFe[0].infNFe[0].det;
        console.log(obj);
        for (k in obj) {
          var item = obj[k];
          arr.push({
            codigo_barras: item.prod[0].cEAN[0],
            descricao: item.prod[0].xProd[0]
          });
        }
        resolve(arr);
      });
    });
  }

}
