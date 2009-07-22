#
# The modules building task
#

require 'rake'
require 'fileutils'
require File.dirname(__FILE__)+'/lib/frontcompiler/init.rb'

BUILD_DIR    = 'build'
BUILD_PREFIX = 'right'

task :default => :build

desc "Builds all the modules"
task :build do
  
  # parsing the modules
  modules = {}
  File.open("src/inits.js").read.match(/var\s+files\s+=\s+\{(.*?)\}/m
    ).to_a[1].scan(/([a-z]+):\s+\[(.*?)\]/m).each do |match|
      modules[match[0]] = []
      match[1].scan(/('|")(.*?)\1/).collect do |f|
        modules[match[0]] << f[1]
      end
  end
  
  # reading the source code
  sources = {}
  
  modules.each do |name, files|
    sources[name] = ""
    files.each do |file|
      sources[name] << "\n" + File.open("src/#{name}/#{file}.js").read
    end
  end
  
  # building the sources
  FileUtils.rm_rf BUILD_DIR
  FileUtils.mkdir BUILD_DIR
  
  @builder = FrontCompiler.new
  
  sources.each do |name, source|
    puts " * Building the #{name} module"
    
    source = File.open("src/#{name}/header.js").read + source
    
    File.open("#{BUILD_DIR}/#{BUILD_PREFIX}-#{name}-src.js", "w").write(source)
    File.open("#{BUILD_DIR}/#{BUILD_PREFIX}-#{name}.js", "w").write(@builder.compact_js(source).create_self_build)
  end
  
  puts " * Building the whole thing"
  
  source = File.open("src/header.js").read + sources.collect{|k, v| v}.join("\n")
  
  File.open("#{BUILD_DIR}/#{BUILD_PREFIX}-goods-src.js", "w").write(source)
  File.open("#{BUILD_DIR}/#{BUILD_PREFIX}-goods.js", "w").write(@builder.compact_js(source).create_self_build)
  
end