#
# The modules building task
#

require 'rake'
require 'fileutils'
require 'util/build/rutil'

BUILD_DIR    = 'build'
BUILD_PREFIX = 'right'

$plugins = FileList['dist/*'].collect do |dirname|
  dirname.gsub('dist/', '')
end

options = ((ENV['OPTIONS'] || '').split('=').last || '').strip.split(/\s*,\s*/)

unless options.empty?
  $plugins.reject! do |name|
    !options.include?(name)
  end
end

$rutils = {};

######################################################################
#  Cleaning up the build directory
######################################################################
desc "Cleans up the build directory"
task :clean do
  puts ' * Nuking the build dir'
  FileUtils.rm_rf BUILD_DIR
  Dir.mkdir BUILD_DIR
end

######################################################################
#  Packs the plugins into source files
######################################################################
desc "Packs the plugins into source files"
task :pack do
  Rake::Task['clean'].invoke
  
  puts " * Packing the source code files"
  $plugins.each do |plugin|
    puts "   - #{plugin}"
    
    files = File.read("src/#{plugin}/__init__.js").scan(/('|")([\w\d]+)\1/).collect do |match|
      "src/#{plugin}/#{match[1]}.js"
    end
    
    rutil = RUtil.new("dist/#{plugin}/header.js", "dist/#{plugin}/layout.js")
    rutil.pack(files)
    rutil.write("#{BUILD_DIR}/#{BUILD_PREFIX}-#{plugin}.js")
    
    $rutils[plugin] = rutil
  end
end

######################################################################
#  Checks the source-code with jslint
######################################################################
desc "Checks the source-code with jslint"
task :check do
  Rake::Task['pack'].invoke
  puts " * Running the jslint check"
  
  $rutils.each do |plugin, rutil|
    puts "   - #{plugin}"
    rutil.check "dist/#{plugin}/lint.js"
  end
end

######################################################################
#  Builds the plugins into minified files
######################################################################
desc "Builds the plugins into minified files"
task :build do
  Rake::Task['pack'].invoke
  puts " * Minifying the source code"
  
  $rutils.each do |plugin, rutil|
    puts "   - #{plugin}"
    rutil.compile
  end
end

