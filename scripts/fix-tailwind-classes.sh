#!/usr/bin/env bash
# Fix Tailwind v4 canonical class suggestions across the project
set -e

PROJECT="$1"
if [ -z "$PROJECT" ]; then
  echo "Usage: $0 /path/to/project/src"
  exit 1
fi

echo "🔍 Scanning: $PROJECT"

# Use perl for reliable multi-pattern in-place substitution (handles macOS & Linux)
# Note: Escaping [ and ] with \\ so they are literal in the shell AND the regex
find "$PROJECT" -type f -name "*.tsx" | while read -r file; do
  perl -i \
    -e 's/font-\[family-name:var\(--font-playfair\)\]/font-(family-name:--font-playfair)/g;' \
    -e 's/text-\[var\(--gray-400\)\]/text-(--gray-400)/g;' \
    -e 's/text-\[var\(--gray-500\)\]/text-(--gray-500)/g;' \
    -e 's/bg-\[var\(--gray-50\)\]/bg-(--gray-50)/g;' \
    -e 's/bg-\[var\(--gray-100\)\]/bg-(--gray-100)/g;' \
    -e 's/bg-\[var\(--gray-200\)\]/bg-(--gray-200)/g;' \
    -e 's/bg-\[var\(--gold-muted\)\]/bg-(--gold-muted)/g;' \
    -e 's/bg-\[var\(--red-muted\)\]/bg-(--red-muted)/g;' \
    -e 's/from-\[var\(--gray-100\)\]/from-(--gray-100)/g;' \
    -e 's/ring-\[var\(--gray-100\)\]/ring-(--gray-100)/g;' \
    -e 's/group-hover:ring-\[var\(--gray-100\)\]/group-hover:ring-(--gray-100)/g;' \
    -e 's/border-white\/\[0\.06\]/border-white\/6/g;' \
    -e 's/border-black\/\[0\.06\]/border-black\/6/g;' \
    -e 's/divide-black\/\[0\.08\]/divide-black\/8/g;' \
    -e 's/bg-gold-dark\/\[0\.06\]/bg-gold-dark\/6/g;' \
    -e 's/bg-gold\/\[0\.08\]/bg-gold\/8/g;' \
    -e 's/text-foreground\/\[0\.08\]/text-foreground\/8/g;' \
    -e 's/group-hover:text-gold\/\[0\.12\]/group-hover:text-gold\/12/g;' \
    -e 's/md:bg-linear-to-r/md:bg-linear-to-r/g;' \
    -e 's/bg-linear-to-bl/bg-linear-to-bl/g;' \
    -e 's/bg-linear-to-br/bg-linear-to-br/g;' \
    -e 's/bg-linear-to-tr/bg-linear-to-tr/g;' \
    -e 's/bg-linear-to-tl/bg-linear-to-tl/g;' \
    -e 's/bg-linear-to-r/bg-linear-to-r/g;' \
    -e 's/bg-linear-to-t/bg-linear-to-t/g;' \
    -e 's/bg-linear-to-b/bg-linear-to-b/g;' \
    -e 's/bg-linear-to-l/bg-linear-to-l/g;' \
    -e 's/sm:aspect-video/sm:aspect-video/g;' \
    -e 's/aspect-video/aspect-video/g;' \
    -e 's/aspect-16\/10/aspect-16\/10/g;' \
    -e 's/sm:aspect-16\/10/sm:aspect-16\/10/g;' \
    -e 's/aspect-4\/3/aspect-4\/3/g;' \
    -e 's/sm:aspect-4\/3/sm:aspect-4\/3/g;' \
    -e 's/lg:aspect-3\/4/lg:aspect-3\/4/g;' \
    -e 's/sm:aspect-3\/2/sm:aspect-3\/2/g;' \
    -e 's/min-h-140/min-h-140/g;' \
    -e 's/sm:min-h-175/sm:min-h-175/g;' \
    -e 's/pt-27\.5/pt-27\.5/g;' \
    -e 's/sm:pt-35/sm:pt-35/g;' \
    -e 's/lg:pt-39/lg:pt-39/g;' \
    -e 's/min-w-45/min-w-45/g;' \
    -e 's/min-[375px]:h-4.5/min-[375px]:h-4.5/g;' \
    -e 's/min-[375px]:w-4.5/min-[375px]:w-4.5/g;' \
    -e 's/h-0\.75/h-0\.75/g;' \
    -e 's/w-0\.75/w-0\.75/g;' \
    -e 's/tracking-widest/tracking-widest/g;' \
    -e 's/duration-900/duration-900/g;' \
    "$file"
  
  # Second pass for the more complex ones using literal replacement via sed
  sed -i "s/font-\[family-name:var(--font-playfair)\]/font-(family-name:--font-playfair)/g" "$file"
  sed -i "s/text-\[var(--gray-400)\]/text-(--gray-400)/g" "$file"
  sed -i "s/text-\[var(--gray-500)\]/text-(--gray-500)/g" "$file"
  sed -i "s/bg-\[var(--gray-50)\]/bg-(--gray-50)/g" "$file"
  sed -i "s/bg-\[var(--gray-100)\]/bg-(--gray-100)/g" "$file"
  sed -i "s/bg-\[var(--gray-200)\]/bg-(--gray-200)/g" "$file"
  sed -i "s/bg-\[var(--gold-muted)\]/bg-(--gold-muted)/g" "$file"
  sed -i "s/bg-\[var(--red-muted)\]/bg-(--red-muted)/g" "$file"
  sed -i "s/from-\[var(--gray-100)\]/from-(--gray-100)/g" "$file"
  sed -i "s/ring-\[var(--gray-100)\]/ring-(--gray-100)/g" "$file"
  sed -i "s/group-hover:ring-\[var(--gray-100)\]/group-hover:ring-(--gray-100)/g" "$file"
  sed -i "s/border-white\/\[0.06\]/border-white\/6/g" "$file"
  sed -i "s/border-black\/\[0.06\]/border-black\/6/g" "$file"
  sed -i "s/divide-black\/\[0.08\]/divide-black\/8/g" "$file"
  sed -i "s/bg-gold-dark\/\[0.06\]/bg-gold-dark\/6/g" "$file"
  sed -i "s/bg-gold\/\[0.08\]/bg-gold\/8/g" "$file"
  sed -i "s/text-foreground\/\[0.08\]/text-foreground\/8/g" "$file"
  sed -i "s/group-hover:text-gold\/\[0.12\]/group-hover:text-gold\/12/g" "$file"
  sed -i "s/bg-gradient-to-r/bg-linear-to-r/g" "$file"
  sed -i "s/md:bg-gradient-to-r/md:bg-linear-to-r/g" "$file"
  sed -i "s/bg-gradient-to-bl/bg-linear-to-bl/g" "$file"
  sed -i "s/bg-gradient-to-br/bg-linear-to-br/g" "$file"
  sed -i "s/bg-gradient-to-tr/bg-linear-to-tr/g" "$file"
  sed -i "s/bg-gradient-to-tl/bg-linear-to-tl/g" "$file"
  sed -i "s/bg-gradient-to-t/bg-linear-to-t/g" "$file"
  sed -i "s/bg-gradient-to-b/bg-linear-to-b/g" "$file"
  sed -i "s/bg-gradient-to-l/bg-linear-to-l/g" "$file"
  sed -i "s/aspect-\[16\/9\]/aspect-video/g" "$file"
  sed -i "s/sm:aspect-\[16\/9\]/sm:aspect-video/g" "$file"
  sed -i "s/aspect-\[16\/10\]/aspect-16\/10/g" "$file"
  sed -i "s/sm:aspect-\[16\/10\]/sm:aspect-16\/10/g" "$file"
  sed -i "s/aspect-\[4\/3\]/aspect-4\/3/g" "$file"
  sed -i "s/sm:aspect-\[4\/3\]/sm:aspect-4\/3/g" "$file"
  sed -i "s/lg:aspect-\[3\/4\]/lg:aspect-3-4/g" "$file"
  sed -i "s/sm:aspect-\[3\/2\]/sm:aspect-3\/2/g" "$file"
  sed -i "s/min-h-\[560px\]/min-h-140/g" "$file"
  sed -i "s/sm:min-h-\[700px\]/sm:min-h-175/g" "$file"
  sed -i "s/pt-\[110px\]/pt-27.5/g" "$file"
  sed -i "s/sm:pt-\[140px\]/sm:pt-35/g" "$file"
  sed -i "s/lg:pt-\[156px\]/lg:pt-39/g" "$file"
  sed -i "s/min-w-\[180px\]/min-w-45/g" "$file"
  sed -i "s/min-\[375px\]:h-\[18px\]/min-[375px]:h-4.5/g" "$file"
  sed -i "s/min-\[375px\]:w-\[18px\]/min-[375px]:w-4.5/g" "$file"
  sed -i "s/h-\[3px\]/h-0.75/g" "$file"
  sed -i "s/w-\[3px\]/w-0.75/g" "$file"
  sed -i "s/tracking-\[0.1em\]/tracking-widest/g" "$file"
  sed -i "s/duration-\[900ms\]/duration-900/g" "$file"

  echo "  ✅ $file"
done

echo ""
echo "✨ Done! All canonical class suggestions applied."
