<script lang="ts">
  import { _ } from 'svelte-i18n';
  import Seo from '#lib/components/Seo.svelte';
</script>

<Seo
  title="Privacy policy · Openbeehive"
  description="Privacy policy for openbeehive.org, a static site with no cookies, no analytics and no third-party resources. GDPR information for the Openbeehive project."
  path="/privacy"
/>

<h1>{$_('pages.privacy_title')}</h1>

<h2>Controller</h2>
<p>
  Johannes Küber<br />
  Goethestr. 15<br />
  64390 Erzhausen<br />
  Germany<br />
  Email: <a href="mailto:contact@openbeehive.org">contact@openbeehive.org</a>
</p>

<h2>This website</h2>
<p>
  openbeehive.org is a static informational site. It loads no third-party resources (fonts, scripts
  and images are served from this domain), sets no cookies and uses no analytics or tracking of any
  kind. Your language and theme choices are saved in your browser's local storage; they stay on your
  device and are not transmitted to us.
</p>

<h2>Hosting</h2>
<p>
  The site is hosted by ALL-INKL.COM - Neue Medien Münnich, Germany. When you visit, the web server
  processes technical connection data (such as your IP address, the requested page, and the time of
  the request) in server logs. This processing is necessary to deliver the site and to ensure its
  stability and security, based on our legitimate interest under Art. 6(1)(f) GDPR.
</p>

<h2>Local-first by design</h2>
<p>
  Openbeehive stores your records in your browser (SQLite on OPFS) and transmits changes to the
  server you sync with. In self-host mode, that server is one you operate. The only other recipient
  of data from the app is the map service described under "Maps and address search" below.
</p>

<h2>What the app processes</h2>
<ul>
  <li>Account identity from your login provider (when authentication is enabled).</li>
  <li>
    The beekeeping records you create (apiaries, hives, queens, inspections, tasks, harvests).
  </li>
  <li>Optional location coordinates you add to an apiary, and photos you attach.</li>
</ul>

<h2>Maps and address search</h2>
<p>
  By default the app uses two services of the OpenStreetMap Foundation (OSMF), a third party, to
  show maps and to find addresses. Your browser contacts them directly, and only in these two
  situations:
</p>
<ul>
  <li>
    When a map is shown (for example the map of your apiaries or the location picker of an apiary),
    the map images for the area in view are loaded from tile.openstreetmap.org.
  </li>
  <li>
    When an address is looked up, the request goes to nominatim.openstreetmap.org and contains the
    address text you type into the location picker, or the coordinates of the pin when you place or
    move it.
  </li>
</ul>
<p>
  With each of these requests OpenStreetMap also receives your IP address, your browser and device
  type, and the web address of the app instance you are using. Apart from the address text or
  coordinates named above, none of your records, photos or account details are sent. Nothing is sent
  to OpenStreetMap as long as no map is shown and no address is looked up. How OpenStreetMap handles
  this data is described in the
  <a href="https://osmfoundation.org/wiki/Privacy_Policy" rel="noopener" target="_blank"
    >OSMF privacy policy</a
  >.
</p>
<p>
  The operator of an Openbeehive server can point the app to a different map and address service or
  switch maps off entirely. The hosted service at app.openbeehive.org uses the OpenStreetMap
  defaults described here.
</p>

<h2>Your rights</h2>
<p>
  Under the GDPR you have the right to access, rectify, delete and export your personal data, to
  restrict or object to its processing, and to lodge a complaint with a supervisory authority. You
  can export or delete your app data at any time; for anything else, contact the controller listed
  above.
</p>
