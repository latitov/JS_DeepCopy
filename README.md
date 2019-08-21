# JS_DeepCopy
Implementation of deep copy of structures in JavaScript

One day a need arised to make deep copies of highly complicated data structures in another project of mine, in JavaScript. So, as usually, I looked on the Internet. Really, why reinvent the wheel, right? So I did (I mean, looked the Internet). You can do it yourself too. There are many suggestions, some absurd, some hacks. E.g. to serialize it to JSON, and then deserialize it back. So after exploring it for a while, I decided it's better to re-invent this wheel on my own, ugh.

This is the result of that effort.

It's all quite simple. There are a functions deep_copy(), and deep_print(). First used to deep copy, and second one is used for monitoring the result purposes.

Note, that deep_print() is called as a normal function: 

    deep_print(you_struct);

And deep_copy is instead should be used as a method. For example, you have this structure:

    var myStruct1 = { ... };
    
Then you add deep_copy as a method:

    myStruct1.deep_copy = deep_copy;
    
The usage then:

    clone2 = myStruct1.deep_copy();
    
That's that simple.

The repository contains t9.html file, where this all is put together, and demonstrated in clear and obvious way.

Hope this wheel will save someone some time.
