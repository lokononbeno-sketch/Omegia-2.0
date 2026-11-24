import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'

// Le dépôt a tous ses fichiers à la racine (pas de dossiers src/components/...),
// alors que les imports du code attendent des sous-dossiers
// (ex: ./components/Feed/Feed, ../../contexts/AuthContext, ../lib/supabase).
// Ce petit plugin retrouve le bon fichier à la racine à partir de son nom.
function flatResolve() {
  const root = process.cwd()
  const exts = ['.tsx', '.ts', '.jsx', '.js']
  const files = new Map<string, string>()
  for (const f of readdirSync(root)) {
    const p = path.parse(f)
    if (exts.includes(p.ext) && !files.has(p.name)) {
      files.set(p.name, path.join(root, f))
    }
  }
  return {
    name: 'flat-resolve',
    enforce: 'pre' as const,
    resolveId(source: string, importer?: string) {
      if (!importer || !source.startsWith('.')) return null
      if (importer.includes('node_modules')) return null
      const target = path.resolve(path.dirname(importer), source)
      if (existsSync(target) && path.extname(target)) return null
      if (exts.some((e) => existsSync(target + e))) return null
      return files.get(path.parse(source).name) ?? null
    },
  }
}

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: any[] = [flatResolve(), react(), tailwindcss()];
  try {
    // @ts-ignore
    const m = await import('./.vite-source-tags.js');
    plugins.push(m.sourceTags());
  } catch {}

  const env = loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_']);
  const processEnvDefines: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(value);
  }

  return {
    // './' : l'application marche aussi bien sur GitHub Pages (sous-dossier) que sur Vercel
    base: './',
    plugins,
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    define: processEnvDefines,
  };
})
