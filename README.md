<h1 align="center">usedownload-dto</h1>

<p align="center" width="300">
   <img align="center" width="200" src="https://i.ibb.co/V3tMCZn/municipio.png" />
</p>
<br/><br/>

<p align="center">
  <a href="https://opensource.org/licenses/MIT" title="License: MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg">
  </a>
  <a href="https://img.shields.io/npm" title="npm">
    <img src="https://img.shields.io/npm/v/react.svg?style=flat)">
  </a>
  <a href="https://www.npmjs.com/package/typescript)" title="npm version">
    <img src="https://badge.fury.io/js/typescript.svg">
  </a>
</p>

<p align="center">
  Descarga de archivos con respuesta DTO
</p>

<br/>

---

<br/>

> Instalación
>
> > npm install usedownload-dto
> >
> > yarn add usedownload-dto
>
> >

<br/>

<br/>

### Motivación

---

<p>La librería se encarga de realizar la petdición de los archivos a descargar en el formato indicado.</p>
<p>La respuesta interna que debe recibir es en formato DTO, por lo que se espera que la 
 api-rest retorne este tipo de formato para poder trabajar manera sincronizada.</p>
<p>El enfoque esta basado en hacer primeramente el llamado al hook.</p>
<p>Seguidamente se debe extraer el manejador de estado a corde al método de busqueda.</p>
<p>De esta manera, el manejador de estado se encargará de mantener actualizado los datos de busqueda,
    mientras que el método de busqueda será quien se encargue de realizar la consulta 
    cuando sea ejecutado.
</p>

---

<br/>

> Consideraciones
>
> > _El objeto DTO de respuesta debe tener uan serie de propiedades_
> >
> > **contentType**: tipo de documento **application/pdf** - **application/zip**.
> > <br/> **nombreArchivo**: nombre del documento.
> > <br/> **contenido**: byte string del archivo.
>
> >

<br/>

### Modo de uso

---

###### _Seleccionables_

Existen dos escenarios en los que vamos a estar descargando archivos.
La primera será cuando accedamos a la grilla de resultados y en esta podamos
seleccionar aquellos que nos interesan.
En este caso utilizaremos lo siguiente. <br/><br/>

| Objetivo             | Menjador de estado | Método            |
| -------------------- | ------------------ | ----------------- |
| Recibos              | select             | receiptPdf        |
| Recibos              | select             | receiptZip        |
| -                    | -                  | -                 |
| Comprobantes de pago | select             | paymentReceiptPdf |
| Comprobantes de pago | select             | paymentReceiptZip |
|                      |                    |                   |

_\*Nota: **select** recibe un array de números de recibos o uno en particular_
<br/>

###### _Desde un link url_

La segunda será cuando accedamos a la descarga del archivo desde un link.
En este caso utilizaremos lo siguiente. <br/><br/>

| Objetivo          | Menjador de estado | Método        |
| ----------------- | ------------------ | ------------- |
| Recibos           | setId - setToken   | receiptByLink |
| Recibos           | setZip             | receiptByLink |
| -                 | -                  | -             |
| Recibos de sueldo | setId              | salaryReceipt |
|                   |                    |               |

<br/>

---

###### _Extras_

Además de estas propiedades el hook retorna el estado de petición **isFetching** y el porcentaje de descarga en tiempo real **progress**.
De esta manera podemos utilizar en la UI alguna estrategia para mostrarle al usuario el estado actual de descarga de los archivos.

<br/>

---

##### _Ejemplo de uso del hook_

```js
    import { useEffect   } from 'react'
    import { useDownload } from 'usedownload-dto'
    import Box from '@mui/material/Box';
    import LinearProgress from '@mui/material/LinearProgress';

    export const TableComponent = () => {
        const navigate = useNavigate()
        const handleDownload = useDownload()

        useEffect(() => {
            const tokenParam = searchParams.get('token')
            const idParam = searchParams.get('id')
            const zipParam = searchParams.get('zip')

            const link = tokenParam || idParam || zipParam

            !link && navigate(Paths.ROOT)

            handleDownload.setToken(tokenParam)
            handleDownload.setId(idParam)
            handleDownload.setZip(zipParam)
        }, [])

        if(handleDownload.isFetching)
            return (
                <Box sx={{ width: '100%' }}>
                  <LinearProgress variant="determinate" value={handleDownload.progress} />
                </Box>
            )

        return (
          <>
            <h4>Descarga de archivo por link<h4/>
            <button type="button"
                onClick={handleDownload.receiptByLink}
            >
              Descargar
            </button>
          </>
        )
    };


```

<br/>

---

#### Desarroladores

- [Esteban Menendez](https://github.com/ejmenendez)
- [Martín Nicolás Paneblanco](https://github.com/pmNiko)
