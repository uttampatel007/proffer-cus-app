# Keep class members for use by the reflection API.
-keepclassmembers class * {
    public <fields>;
    public <methods>;
}

# Keep class members for use by the serialization API.
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# Keep class members for use by the Android support libraries.
-keep class android.support.** { *; }

# Keep class members for use by the Ionic framework.
-keep class com.ionicframework.** { *; }

# Keep class members for use by the Vue.js framework.
-keep class vue** { *; }

# Keep class members for use by the Vuex state management library.
-keep class vuex** { *; }
