import Typography from '@mui/material/Typography'

export function AllPrivacyText (): JSX.Element {
  return (
    <>
      <Typography component='div' variant='body2' sx={{ mb: 2, textAlign: 'justify' }}>
        {'La presente Política de Privacidad establece los términos de uso de la información que es proporcionada por los usuarios al momento de utilizar esta página web. Cuando se le solicite llenar algún formulario, deberá brindar información que no sea de carácter personal suyo o de terceros considerando que el sitio web funciona únicamente a modo de portafolio y se empleara únicamente para exploración dentro la propia página.  Esto se hace para asegurar que la información personal de cada visitante no se vea comprometida en ningún momento. Esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que se le recomienda revisar continuamente este documento para asegurarse que está de acuerdo con dichos cambios.'}
      </Typography>

      <Typography component='div' variant='body2' sx={{ mb: 1, fontWeight: 'bold' }}>
        {'Información que es recogida:'}
      </Typography>
      <Typography component='div' variant='body2' sx={{ mb: 2, textAlign: 'justify' }}>
        {'La página web podrá recoger información recolectada en los formularios con datos NO PERSONALES para la creación de cuentas de uso temporal dentro de la propia página. Estos formularios solicitan: “firstname”, “lastname”, “email”, “password”. También es posible cargar imagenes las cuales deben venir de una fuente libre. Toda esta información será almacenada temporalmente para su posterior eliminación.'}
      </Typography>

      <Typography component='div' variant='body2' sx={{ mb: 1, fontWeight: 'bold' }}>
        {'Uso de la información recogida:'}
      </Typography>
      <Typography component='div' variant='body2' sx={{ mb: 2, textAlign: 'justify' }}>
        {'La página web emplea la información para simular el registro temporal de una cuenta y poder acceder a apartados especiales.  Esta información no se empleará de ninguna manera externa a la página ni será compartida, vendida o distribuida de alguna forma con ningún tercero.'}
        <br />
        {'Nunca se enviarán correos electrónicos, ofertas, publicidad, o cualquier otro tipo de mensajes a las direcciones de correo electrónico aquí registradas. Por ello, y debido a la naturaleza de uso temporal de dicha información, se deben registrar datos ficticios únicamente con la intención de explorar el portafolio.'}
        <br />
        {'La información registrada estará almacenada en una base de datos hasta su posterior limpieza y total eliminación con el fin restablecer el estado original de la página web.'}
      </Typography>

      <Typography component='div' variant='body2' sx={{ mb: 1, fontWeight: 'bold' }}>
        {'Almacenamiento local del navegador:'}
      </Typography>
      <Typography component='div' variant='body2' sx={{ mb: 2, textAlign: 'justify' }}>
        {'La página web utiliza el almacenamiento local llamado “localStorage” para guardar la información correspondiente al inicio de sesión y elimina dicha información de manera automática en el proceso de cierre de sesión. Si desea eliminar manualmente estos datos puede cerrar y volver a abrir el navegador o borrar el historial de la navegación.'}
      </Typography>

      <Typography component='div' variant='body2' sx={{ mb: 1, fontWeight: 'bold' }}>
        {'Cookies:'}
      </Typography>
      <Typography component='div' variant='body2' sx={{ mb: 2, textAlign: 'justify' }}>
        {'La página web no emplea el uso de cookies propias ni de terceros.'}
      </Typography>

      <Typography component='div' variant='body2' sx={{ mb: 1, fontWeight: 'bold' }}>
        {'Enlaces a Terceros:'}
      </Typography>
      <Typography component='div' variant='body2' sx={{ mb: 2, textAlign: 'justify' }}>
        {'Este sitio web pudiera contener enlaces a otros sitios únicamente para enseñar dicha funcionalidad. Una vez que usted de clic en estos enlaces y abandone la página, no habrá control sobre el sitio al que es redirigido y por lo tanto el propietario no será responsable de los términos o privacidad en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo o simplemente abandone inmediatamente dichos sitios.'}
      </Typography>

      <Typography component='div' variant='body2' sx={{ mb: 1, fontWeight: 'bold' }}>
        {'Control de la información:'}
      </Typography>
      <Typography component='div' variant='body2' sx={{ mb: 2, textAlign: 'justify' }}>
        {'No se retendrá ningún dato, eliminando constantemente la información registrada en la página web.'}
        <br />
        {'El propietario se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.'}
      </Typography>

      <Typography component='div' variant='body2' sx={{ mb: 1, textAlign: 'center' }}>
        {'SI NO ESTA DE ACUERDO CON LOS TÉRMINOS Y CONDICIONES O LA POLÍTICA DE PRIVACIDAD ABSTÉNGASE DE CONTINUAR NAVEGANDO EN ESTA PAGINA WEB'}
      </Typography>
    </>
  )
}
