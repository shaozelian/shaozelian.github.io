Jekyll::Hooks.register :site, :post_write do |site|
  puts ">>> Pagefind hook triggered for #{site.dest}"
  system("npx pagefind --source \"#{site.dest}\"")
end